// Demande de contact / devis : enregistrée dans Supabase (table leads) et notifiée par e-mail à l'équipe.
// Pas de suffixe .post : la pré-vérification CORS (OPTIONS) doit arriver jusqu'ici quand l'API est hébergée à part.

const SERVICES = ['web', 'app', 'seo', 'mobile', 'ads', 'social', 'ia']

interface ContactBody {
  services?: string[]; budget?: string; timing?: string; message?: string; name?: string; company?: string
  email?: string; phone?: string; website?: string; consent?: boolean; locale?: 'fr' | 'en'; hp?: string // hp = champ piège anti-spam
}

const clean = (v: unknown, max: number) => String(v ?? '').replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, ' ').trim().slice(0, max)

export default defineEventHandler(async (event) => {
  if (bookingCors(event)) return // requête de pré-vérification CORS (OPTIONS) traitée
  assertMethod(event, 'POST')
  if (rateLimited(event)) throw createError({ statusCode: 429, statusMessage: 'Trop de tentatives, réessayez plus tard' })

  const body = await readBody<ContactBody>(event)
  if (body?.hp) return { ok: true } // robot : on n'enregistre rien, sans le signaler

  const lead = {
    locale: body?.locale === 'en' ? 'en' : 'fr',
    services: (Array.isArray(body?.services) ? body.services : []).filter(s => SERVICES.includes(s)),
    budget: clean(body?.budget, 60) || null,
    timing: clean(body?.timing, 60) || null,
    message: clean(body?.message, 3000) || null,
    name: clean(body?.name, 120),
    company: clean(body?.company, 120) || null,
    email: clean(body?.email, 160),
    phone: clean(body?.phone, 40) || null,
    website: clean(body?.website, 200) || null,
    consent_at: new Date().toISOString()
  }
  if (!lead.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) throw createError({ statusCode: 400, statusMessage: 'Nom ou e-mail invalide' })
  if (body?.consent !== true) throw createError({ statusCode: 400, statusMessage: 'Consentement requis' })

  const db = supabaseAdmin()
  const tx = smtp()
  if (!db && !tx) throw createError({ statusCode: 503, statusMessage: 'Formulaire non configuré' })

  // La demande est acceptée dès qu'elle est enregistrée OU notifiée : l'un peut échouer sans perdre le contact
  const [saved, mailed] = await Promise.allSettled([
    db ? db.from('leads').insert(lead).then(({ error }) => { if (error) throw error }) : Promise.reject(new Error('Supabase non configuré')),
    tx ? sendLeadMail(tx, lead) : Promise.reject(new Error('SMTP non configuré'))
  ])
  if (db && saved.status === 'rejected') console.error('[contact] supabase', saved.reason)
  if (tx && mailed.status === 'rejected') console.error('[contact] mail', mailed.reason)
  if (saved.status === 'rejected' && mailed.status === 'rejected') throw createError({ statusCode: 502, statusMessage: 'Envoi impossible' })

  return { ok: true }
})
