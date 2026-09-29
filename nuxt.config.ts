// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-09-01',
  devtools: { enabled: false },
  css: ['@fontsource-variable/bricolage-grotesque', '@fontsource-variable/geist', '~/assets/css/main.css'],
  runtimeConfig: {
    // Réservation d'appels (serveur uniquement) — voir .env.example
    calendarProvider: 'ksuite', // ksuite (CalDAV Infomaniak) | google
    caldavUrl: '',
    caldavUsername: '',
    caldavPassword: '',
    kmeetBase: 'https://kmeet.infomaniak.com/',
    smtpHost: 'mail.infomaniak.com',
    smtpPort: '465',
    smtpUser: '',
    smtpPassword: '',
    mailFrom: '',
    bookingNotifyEmail: '',
    googleServiceAccountEmail: '',
    googlePrivateKey: '',
    googleCalendarId: '',
    googleImpersonate: '',
    bookingAllowedOrigins: '',
    public: {
      siteUrl: 'https://bns-digital.com',
      formEndpoint: '',
      // URL de l'API de réservation si elle est hébergée ailleurs que le site statique (ex. https://bns-digital.vercel.app)
      bookingApi: ''
    }
  },
  modules: ['@nuxtjs/i18n'],
  i18n: {
    // Français à la racine (/), anglais sous /en, URL traduites (customRoutes)
    locales: [
      { code: 'fr', language: 'fr', name: 'Français' },
      { code: 'en', language: 'en', name: 'English' }
    ],
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    baseUrl: 'https://bns-digital.com',
    detectBrowserLanguage: false, // pas de redirection automatique : chaque URL reste stable pour Google
    customRoutes: 'config',
    pages: {
      'services/index': { fr: '/services', en: '/services' },
      'services/[slug]': { fr: '/services/[slug]', en: '/services/[slug]' },
      'realisations/index': { fr: '/realisations', en: '/work' },
      'realisations/[slug]': { fr: '/realisations/[slug]', en: '/work/[slug]' },
      'agence': { fr: '/agence', en: '/about' },
      'contact': { fr: '/contact', en: '/contact' },
      'agence-digitale/[slug]': { fr: '/agence-digitale/[slug]', en: '/digital-agency/[slug]' },
      'cgv': { fr: '/cgv', en: '/terms' },
      'mentions-legales': { fr: '/mentions-legales', en: '/legal-notice' },
      'rendez-vous': { fr: '/rendez-vous', en: '/book-a-call' },
      'blog/index': { fr: '/blog', en: '/blog' },
      'blog/[slug]': { fr: '/blog/[slug]', en: '/blog/[slug]' }
    },
    experimental: { strictSeo: true }
  },
  app: {
    head: {
      titleTemplate: '%s · BNS Digital',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0A1A47' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icon-32.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icon-192.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ]
    }
  },
  nitro: {
    // Articles du blog accessibles côté serveur (sitemap, flux RSS)
    serverAssets: [{ baseName: 'blog', dir: '../content/blog' }],
    prerender: {
      crawlLinks: true,
      routes: ['/', '/en', '/sitemap.xml', '/blog/rss.xml', '/en/blog/rss.xml'],
      // /services → services.html (et non services/index.html) : URL sans slash final, servie par public/.htaccess
      autoSubfolderIndex: false
    }
  }
})
