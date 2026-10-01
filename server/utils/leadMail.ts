import type { Transporter } from 'nodemailer'

export interface LeadMail {
  locale: string; services: string[]; budget: string | null; timing: string | null; message: string | null
  name: string; company: string | null; email: string; phone: string | null; website: string | null
}

/** Notification d'une nouvelle demande de devis à l'équipe (réponse directe au prospect via Reply-To) */
export async function sendLeadMail(tx: Transporter, l: LeadMail) {
  const c = useRuntimeConfig()
  await tx.sendMail({
    from: String(c.mailFrom || c.smtpUser),
    to: String(c.bookingNotifyEmail || c.smtpUser),
    replyTo: l.email,
    subject: `Nouvelle demande de devis — ${l.name}${l.company ? ` (${l.company})` : ''}`,
    text: [
      `Demande envoyée depuis le formulaire de contact (${l.locale.toUpperCase()}) :`, '',
      `Nom : ${l.name}`, l.company && `Entreprise : ${l.company}`, `E-mail : ${l.email}`, l.phone && `Téléphone : ${l.phone}`,
      l.website && `Site actuel : ${l.website}`, '',
      `Besoins : ${l.services.join(', ') || '—'}`, l.budget && `Budget : ${l.budget}`, l.timing && `Délai : ${l.timing}`,
      l.message && `\nProjet :\n${l.message}`
    ].filter(v => typeof v === 'string').join('\n')
  })
}
