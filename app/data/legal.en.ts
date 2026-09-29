// English legal pages. The French versions (pages/cgv.vue, pages/mentions-legales.vue) prevail in case of discrepancy.
import type { LegalArticle } from '~/components/LegalPage.vue'
import { COMPANY, CONTACT } from './content'

export const TERMS_EN = {
  title: 'Terms and Conditions',
  eyebrow: 'Terms and conditions',
  lead: 'Because clear agreements make great partnerships.',
  articlesTitle: 'Detailed terms',
  footnote: 'These terms and conditions apply from 1 January 2026. BNS Digital reserves the right to amend them at any time. Changes apply only to orders and quotes issued after the update date. This English version is provided for convenience; in the event of any discrepancy, the French version prevails.',
  seoTitle: 'Terms and Conditions',
  seoDesc: 'BNS Digital terms and conditions: quotes, payment, delivery times, maintenance, intellectual property and liability for all our digital services.',
  keys: [
    { t: 'Clearly scoped services', d: 'Every service is subject to a detailed quote and requires your prior approval. You keep full control over your project scope.' },
    { t: 'Payment terms', d: 'A clear payment structure: 50% on order, 50% on delivery. Specific conditions are always set out in your quote.' },
    { t: 'Delivery times', d: 'Timelines are carefully estimated and given as an indication. We commit to transparent communication about progress.' },
    { t: 'Limited liability', d: 'Our commitment is to the means we deploy. Performance also depends on external factors (algorithms, market, etc.).' }
  ],
  articles: [
    { t: 'Presentation of the company', blocks: [
      'These General Terms and Conditions (GTC) govern the contractual relationship between BNS Digital, a digital agency specialising in the design, management and deployment of digital solutions, hereinafter “BNS Digital”, and any natural or legal person wishing to use its services, hereinafter “the Client”.',
      'Approval of a quote, order or service implies full acceptance of these GTC.'
    ] },
    { t: 'Purpose', blocks: [
      'The purpose of these GTC is to define the conditions under which BNS Digital provides its digital services. Services offered may include:',
      ['social media content creation (posts, short videos);', 'social media management and strategy;', 'website creation;', 'e-commerce website development;', 'application development;', 'design and deployment of artificial intelligence agents;', 'digital automation;', 'graphic design;', 'digital marketing;', 'digital strategy consulting.'],
      'Each service is subject to a quote or commercial proposal.'
    ] },
    { t: 'Orders', blocks: [
      'An order becomes firm and final after:',
      ['approval of the quote by the Client;', 'payment of the agreed deposit.'],
      'BNS Digital reserves the right to refuse an order in the event of a prior dispute with the Client.'
    ] },
    { t: 'Prices', blocks: [
      'Prices are expressed in the currency stated on the quote, excluding or including taxes depending on the tax situation. Rates may vary depending on:',
      ['project complexity;', 'workload;', 'technologies used;', 'requested deadlines.'],
      'Quotes are valid for 30 days unless otherwise stated.'
    ] },
    { t: 'Payment terms', blocks: [
      'Services are paid as follows:',
      ['50% of the total amount upon ordering;', '50% upon delivery or availability of the project.'],
      'Final delivery or go-live may be conditional upon full payment of the balance. Payments can be made by:',
      ['bank transfer;', 'credit card;', 'any other means accepted by BNS Digital.'],
      'Any late payment may result in penalties in accordance with current regulations.'
    ] },
    { t: 'Delivery times', blocks: [
      'Delivery times are given as an indication. They may vary depending on:',
      ['project complexity;', 'resource availability;', 'the Client’s responsiveness;', 'delivery of the necessary content.'],
      'BNS Digital cannot be held responsible for delays caused by a lack of approval or information from the Client.'
    ] },
    { t: 'Revisions and changes', blocks: [
      'Each service includes two revision cycles in the initial price. A revision is a reasonable change request based on the delivered work.',
      'Any additional change may be subject to:',
      ['additional billing;', 'or a new quote.'],
      'Major changes may be considered a new project.'
    ] },
    { t: 'Delivery of services', blocks: [
      'Services may be delivered as:',
      ['digital files;', 'published content;', 'a website launch;', 'an application launch;', 'access to a solution or an AI agent.'],
      'Delivery is considered complete as soon as the deliverable is made available to the Client.'
    ] },
    { t: 'Maintenance of digital solutions', blocks: [
      'Upon delivery of a website, e-commerce platform, application or AI agent, BNS Digital includes initial technical maintenance for 12 months from go-live. This maintenance covers:',
      ['fixing bugs related to the initial development;', 'keeping the solution working properly overall;', 'basic technical compatibility with the technologies used.'],
      'This maintenance does not cover:',
      ['functional changes;', 'new features;', 'changes requested by the Client;', 'changes made by a third party;', 'changes related to external services.'],
      { h: 'Maintenance after the first year' },
      'At the end of this period, maintenance can be continued under a subscription offered by BNS Digital. This subscription may include:',
      ['ongoing technical maintenance;', 'security updates;', 'performance monitoring;', 'technical optimisation;', 'AI agent adjustments.'],
      'Without an active maintenance contract, BNS Digital cannot be held responsible for the technical evolution of the solutions.'
    ] },
    { t: 'Use of external providers', blocks: [
      'In delivering its services, BNS Digital acts as an intermediary and coordinator of digital services. For certain projects, BNS Digital may call on independent external providers, who may work on:',
      ['web development;', 'content production;', 'design;', 'digital marketing;', 'application development;', 'AI agent development.']
    ] },
    { t: 'Provider liability', blocks: [
      'External providers work as independent professionals and are fully responsible for their services.',
      'BNS Digital cannot be held responsible for defects, delays or malfunctions attributable to these providers.'
    ] },
    { t: 'Single point of contact', blocks: [
      'As part of the project organisation, BNS Digital remains the Client’s single point of contact and coordinates all stakeholders.',
      'However, technical responsibility for carrying out the services lies with the providers who performed the work.'
    ] },
    { t: 'Limitation of liability', blocks: [
      'BNS Digital’s liability can only be engaged in the event of proven fault. In any event, BNS Digital’s total liability is limited to the amount paid by the Client for the service concerned.',
      'BNS Digital cannot be held liable for indirect damages such as:',
      ['loss of revenue;', 'loss of data;', 'operating losses;', 'loss of business opportunities.']
    ] },
    { t: 'Dependence on external services', blocks: [
      'Some services rely on third-party services such as:',
      ['social networks;', 'web hosts;', 'CMS platforms;', 'e-commerce solutions;', 'APIs;', 'artificial intelligence services.'],
      'BNS Digital cannot be held responsible for interruptions, changes or discontinuations of services related to these platforms.'
    ] },
    { t: 'Hosting and security', blocks: [
      'Unless otherwise stated, the solutions developed are hosted by specialised providers. BNS Digital cannot be held responsible for:',
      ['a hosting provider failure;', 'an external security breach;', 'data loss caused by a third party.']
    ] },
    { t: 'Use of artificial intelligence solutions', blocks: [
      'Artificial intelligence solutions may produce variable results. The Client acknowledges that:',
      ['results may require human validation;', 'performance may change depending on the technologies used.'],
      'BNS Digital cannot guarantee a specific result from the use of an AI agent.'
    ] },
    { t: 'Recurring services', blocks: [
      'Some services may be offered as a monthly subscription. Unless otherwise stated, they are concluded for a minimum period of 3 months, then automatically renewed on a monthly basis.',
      'Termination must be notified with 30 days’ notice.'
    ] },
    { t: 'Delay or lack of Client collaboration', blocks: [
      'Delivering the services requires the Client’s active collaboration. If there is no response for more than 15 days, the project schedule may be adjusted.',
      'Beyond 30 days, the project may be suspended. Resuming it may incur additional costs.'
    ] },
    { t: 'Intellectual property', blocks: [
      'The creations become the Client’s property once paid in full. BNS Digital retains ownership of:',
      ['its methods;', 'its internal tools;', 'its frameworks;', 'its reusable technical components.'],
      'BNS Digital may showcase the work in its portfolio.'
    ] },
    { t: 'Confidentiality', blocks: [
      'BNS Digital undertakes to respect the confidentiality of the information provided by the Client.'
    ] },
    { t: 'Termination', blocks: [
      'If the project is cancelled after it has started:',
      ['the deposit paid is retained by BNS Digital;', 'work already completed may be invoiced.']
    ] },
    { t: 'No refunds', blocks: [
      'As the services are customised, no refund can be claimed once the service has started, except in the event of serious misconduct attributable to BNS Digital.'
    ] },
    { t: 'Approval of deliverables', blocks: [
      'The Client has 7 days after delivery to request a revision or report an issue.',
      'Without feedback within this period, the deliverable is deemed accepted and approved.'
    ] },
    { t: 'Claims period', blocks: [
      'Any claim must be made within a maximum of 7 days after delivery. After this period, the service is deemed compliant.'
    ] },
    { t: 'Governing law', blocks: [
      'These GTC are governed by [governing law to be confirmed]. In the event of a dispute, the parties will seek an amicable solution.',
      'Failing that, the dispute will be referred to the competent courts of the place where BNS Digital has its registered office.'
    ] }
  ] as LegalArticle[]
}

const mail: [string, string, string] = ['Contact', CONTACT.email, `mailto:${CONTACT.email}`]

export const LEGAL_EN = {
  title: 'Legal notice',
  eyebrow: 'Legal information',
  lead: 'Regulatory information about this website, our commitments and BNS Digital’s business.',
  seoTitle: 'Legal notice',
  seoDesc: 'Legal notice for bns-digital.com: publisher, hosting, intellectual property, personal data, cookies and governing law.',
  articles: [
    { t: 'Website publisher', blocks: [
      'This website, bns-digital.com, is published by BNS Digital, based in Dakar (Senegal).',
      { kv: [
        ['Company name', COMPANY.legalName],
        ['Legal form', COMPANY.legalForm],
        ['Registered office', `${COMPANY.street}, Dakar, Senegal`],
        ['Trade register (RCCM)', COMPANY.rccm],
        ['Tax ID (NINEA)', COMPANY.ninea],
        ['Publication director', '[Publication director]'],
        mail
      ] }
    ] },
    { t: 'Hosting', blocks: [
      'The website is hosted by:',
      { kv: [
        ['Host', '[Hosting provider]'],
        ['Address', '[Hosting provider address]'],
        ['Website', '[Hosting provider website]']
      ] }
    ] },
    { t: 'Intellectual property and infringement', blocks: [
      'All content on this website (text, images, videos, logos, design, source code) is the exclusive property of BNS Digital, unless expressly stated otherwise.',
      'Any reproduction, representation, modification, publication or adaptation of all or part of the website’s content, by any means or process whatsoever, is prohibited without BNS Digital’s prior written consent.',
      'Any unauthorised use of the website or of any of its content will be considered an infringement and prosecuted in accordance with applicable intellectual property laws.'
    ] },
    { t: 'Terms of use', blocks: [
      'Using bns-digital.com implies full acceptance of these terms of use, which may be amended or supplemented at any time.',
      'The website is normally accessible at all times. BNS Digital may, however, interrupt access for technical maintenance, in which case it will endeavour to inform users of the date and time of the intervention in advance.'
    ] },
    { t: 'Limitation of liability', blocks: [
      'As publisher of the website, BNS Digital strives to provide information that is as accurate as possible. However, it cannot be held responsible for omissions, inaccuracies or failures to update, whether due to itself or to third-party partners who provide it with information.',
      'BNS Digital accepts no liability for any malfunction of the website that may result in data loss or unavailability of the information it provides.'
    ] },
    { t: 'Personal data', blocks: [
      'BNS Digital processes personal data in accordance with Senegalese Law No. 2008-12 of 25 January 2008 on the protection of personal data and, for users located in the European Union, the General Data Protection Regulation (GDPR, Regulation (EU) 2016/679). For users located in Canada, we take into account PIPEDA and, in Quebec, Law 25.',
      'BNS Digital is the data controller for personal data collected while users browse the website or through our forms.',
      'BNS Digital undertakes to comply with the applicable legal framework. No personal information about website users is published without their knowledge, exchanged, transferred, assigned or sold to third parties on any medium.'
    ] },
    { t: 'Privacy policy and your rights', blocks: [
      'In accordance with applicable regulations, users of bns-digital.com have the following rights:',
      ['right of access, rectification, updating and completion of data;', 'right to block or erase data;', 'right to withdraw consent at any time;', 'right to restrict processing.'],
      'To exercise these rights, please contact BNS Digital by email, enclosing a copy of a valid ID document:',
      { kv: [mail] }
    ] },
    { t: 'Links and cookies', blocks: [
      'bns-digital.com contains a number of links to other websites. BNS Digital cannot check the content of those websites and therefore accepts no responsibility for them.',
      { h: 'Cookies' },
      'Browsing the website may result in cookies being placed on the user’s device. A cookie is a small file that does not identify the user but records information about a device’s browsing on a website.',
      'Refusing cookies may prevent access to some services. Users can, however, configure their device to refuse cookies.'
    ] },
    { t: 'Governing law and jurisdiction', blocks: [
      'Any dispute relating to the use of bns-digital.com is governed by [governing law to be confirmed]. Except where the law provides otherwise, exclusive jurisdiction is given to the competent courts of BNS Digital’s registered office.'
    ] },
    { t: 'Contact and complaints', blocks: [
      'To report illegal content or activity, or for any question about this legal notice, users can contact the publisher by email:',
      { kv: [mail] }
    ] }
  ] as LegalArticle[]
}
