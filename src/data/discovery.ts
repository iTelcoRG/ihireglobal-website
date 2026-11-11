export interface DiscoveryPage {
  slug: string;
  name: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  context: string;
  work: string[];
  planning: string;
  scope: string;
  roles: string[];
  related: string[];
}

export const industries: DiscoveryPage[] = [
  {
    slug: 'healthcare', name: 'Healthcare',
    title: 'Offshore staffing for healthcare administration',
    description: 'Explore dedicated offshore administration, patient enquiry and digital support for healthcare businesses. Scope non-clinical work with iHire Global.',
    heading: 'More support behind the care you provide.',
    intro: 'Healthcare businesses have administrative work that needs time, accuracy and a consistent owner. A dedicated offshore employee can support agreed non-clinical workflows while your local team retains oversight.',
    context: 'Start with a clearly bounded process such as appointment administration, record entry or general enquiries. Give the employee approved scripts, a named supervisor and a clear route for questions that require a clinical team member.',
    work: ['Coordinate bookings and appointment reminders using approved processes', 'Enter and check administrative data within agreed access permissions', 'Respond to general patient enquiries and route clinical questions', 'Maintain approved website content and routine back-office records'],
    planning: 'Before recruiting, agree the systems involved, the information the employee needs to access and which decisions stay with your team. Review privacy, access and any role-specific requirements with your own responsible advisers before sharing patient information.',
    scope: "Dedicated non-clinical support for your administrative workflows, with responsibilities and access agreed around your practice. Clinical advice, triage and treatment remain with your clinical team.",
    roles: ['administration', 'customer-service', 'digital-marketing'], related: ['add-capacity', 'reduce-hiring-pressure']
  },
  {
    slug: 'ecommerce', name: 'E-commerce',
    title: 'Offshore e-commerce staffing for online retailers',
    description: 'Add offshore e-commerce capacity for Shopify product administration, catalogue updates, customer support and digital marketing with iHire Global.',
    heading: 'Keep your store moving as your catalogue grows.',
    intro: 'Product updates, order enquiries and campaign administration do not stop when your local team gets busy. Build dedicated support around the everyday work behind your online store.',
    context: 'Shopify product administration is part of our real operational experience. That gives us a practical starting point for discussing product loading, content checks and the handovers needed between an offshore administrator and your merchandising team.',
    work: ['Load products, variants, images and approved descriptions', 'Maintain catalogue information and check published changes', 'Handle order enquiries using your customer service policies', 'Support campaign publishing, digital content and routine reporting'],
    planning: 'Define who approves product information, prices, promotions and refunds. Confirm platform permissions and how the employee should handle stock discrepancies or customer exceptions. A sample catalogue task can help you assess accuracy during interviews.',
    scope: 'Our experience includes Shopify product administration. Broader retail workflows are scoped to your platform and requirements; your business retains merchandising, pricing and customer-policy decisions.',
    roles: ['ecommerce', 'customer-service', 'digital-marketing'], related: ['add-capacity', 'extend-operating-hours']
  },
  {
    slug: 'telecommunications', name: 'Telecommunications',
    title: 'Offshore staffing for telecommunications workflows',
    description: 'Explore offshore sales verification, customer support and administration for telecommunications businesses with clear scripts and escalation procedures.',
    heading: 'Keep customer information and sales handovers clear.',
    intro: 'Telecommunications workflows often involve repeated checks, customer follow-up and coordination across teams. A dedicated offshore employee can own a defined part of that process.',
    context: 'Our operational experience includes telephone verification of door-to-door sales. We can use that practical experience to discuss structured calls, accurate records and escalation of information that does not match an agreed process.',
    work: ['Verify sales information by telephone against approved scripts', 'Maintain customer records and document exceptions', 'Coordinate enquiries, follow-ups and service handovers', 'Support digital operations or first-line technical enquiries where skills fit'],
    planning: 'Agree the purpose of each call, the required checks, record-keeping and escalation rules. You approve scripts, customer statements and system access. Technical support needs a separate capability assessment and a defined limit on what the employee can resolve.',
    scope: "Our telephone sales verification experience gives us a practical foundation for supporting your customer workflows. We recruit around your requirements, with your team setting scripts, approvals and compliance standards.",
    roles: ['sales-support', 'customer-service', 'operations', 'it-support'], related: ['add-capacity', 'extend-operating-hours']
  },
  {
    slug: 'professional-services', name: 'Professional Services',
    title: 'Offshore support for professional services businesses',
    description: 'Explore dedicated offshore administration, finance support, marketing and project coordination for professional services firms in NZ and Australia.',
    heading: 'Give your specialists more time for client work.',
    intro: 'A busy practice needs more than professional expertise. Scheduling, document preparation, project updates and follow-up all need attention. Offshore support can give that recurring work a dedicated owner.',
    context: 'Consider the work that repeatedly interrupts your fee-earning team. A well-defined administration or project-support role can bring those tasks together, with a local manager setting priorities and reviewing output.',
    work: ['Coordinate calendars, meetings and routine client correspondence', 'Prepare documents and maintain project trackers', 'Support invoice preparation and finance records for review', 'Publish approved marketing content and maintain CRM information'],
    planning: 'Scope the role around your workflows and approval controls. Establish how confidential documents are accessed, who reviews client-facing work and when the employee must seek advice. Finance tasks need clear review and payment-authorisation boundaries.',
    scope: "Build support around your practice’s workflows, confidentiality requirements and review processes. Your qualified professionals retain responsibility for regulated advice and final sign-off.",
    roles: ['administration', 'accounting-finance', 'digital-marketing', 'operations'], related: ['reduce-hiring-pressure', 'improve-cost-efficiency']
  },
  {
    slug: 'technology', name: 'Technology',
    title: 'Offshore staffing for technology teams',
    description: 'Recruit dedicated offshore software, IT support and digital operations staff around your stack, technical assessment and delivery process.',
    heading: 'Add capability without losing your way of working.',
    intro: 'Technology teams need people who can work within their systems and delivery standards. Recruit around the actual stack, support environment and level of responsibility your team needs.',
    context: 'Digital platform management is part of our operational experience. For software development, service desk or QA requirements, a precise technical brief and an assessment led by your own team help establish the right fit.',
    work: ['Develop and test software within your engineering process', 'Triage support requests and maintain diagnostic notes', 'Administer digital platforms and document recurring tasks', 'Coordinate delivery updates, testing checklists and project records'],
    planning: 'Identify the technical lead responsible for onboarding and review. Confirm repository or system permissions, development environments, support escalation and release authority. We screen for relevant experience; your team evaluates technical depth before selection.',
    scope: "We recruit against your technical brief, screening for relevant experience and the qualifications your role requires. Your team assesses technical capability and fit before selecting.",
    roles: ['software-development', 'it-support', 'operations'], related: ['access-specialist-skills', 'build-an-offshore-team']
  },
  {
    slug: 'security-monitoring', name: 'Security & Monitoring',
    title: 'Offshore after-hours security and operational monitoring',
    description: 'Explore dedicated offshore surveillance monitoring, incident logs, escalation and shift handovers, informed by iHire’s operational experience.',
    heading: 'Keep watch beyond your local working day.',
    intro: 'Dedicated offshore monitoring can extend operating coverage when it is built around clear procedures, agreed shifts and reliable handovers. Your business remains responsible for directing the work and the response.',
    context: 'After-hours surveillance monitoring is part of our real-world operational experience. It demonstrates how an offshore team member can observe agreed systems, record events and contact the right person when an escalation is needed.',
    work: ['Monitor agreed surveillance or operational systems during defined shifts', 'Maintain accurate incident and observation logs', 'Escalate events to your nominated response contacts', 'Prepare a structured handover for the incoming team'],
    planning: 'Define what counts as an event, who responds and how to handle an unavailable contact. Scope connectivity, power backup, shift suitability and training before the hire. Any licensing or specialist role requirements must be reviewed before an offer.',
    scope: 'Monitoring does not by itself provide on-site intervention or guaranteed continuous coverage. Hours, backup arrangements, response responsibilities and local support must be agreed for your operation.',
    roles: ['monitoring-after-hours', 'operations'], related: ['extend-operating-hours', 'build-an-offshore-team']
  }
];

export const needs: DiscoveryPage[] = [
  {
    slug: 'add-capacity', name: 'Add capacity',
    title: 'Add business capacity with dedicated offshore staff',
    description: 'Turn recurring backlogs into a defined offshore role. Add dedicated capacity while your NZ or Australian team manages priorities and quality.',
    heading: 'When the work grows faster than the team.',
    intro: 'More enquiries, more orders and more administration can stretch a capable team. Dedicated offshore staffing gives recurring work an owner without requiring you to expand local recruitment immediately.',
    context: 'Start with a short list of tasks that are delayed, repeatedly handed around or taking skilled staff away from their main job. Group work that needs similar skills into a coherent role rather than an open-ended list of everything the team is too busy to do.',
    work: ['Identify recurring work and its weekly volume', 'Define outcomes, systems and the experience required', 'Name a manager who can provide training and review', 'Agree the hours and handovers needed by your local team'],
    planning: 'A growing online retailer might begin with product administration and catalogue checks. A service business might need an administrator for bookings and follow-up. You set the priorities; iHire recruits, screens and arranges employment and infrastructure around the selected person.',
    scope: 'Additional capacity still needs onboarding and management time. Start with a realistic scope and review it as the employee learns your business; recruitment timing depends on the role and candidate availability.',
    roles: ['administration', 'ecommerce', 'customer-service'], related: ['ecommerce', 'healthcare', 'professional-services']
  },
  {
    slug: 'reduce-hiring-pressure', name: 'Reduce hiring pressure',
    title: 'Reduce local hiring pressure through offshore recruitment',
    description: 'Explore another talent pool for difficult-to-fill roles. iHire handles sourcing and screening while you interview and choose your employee.',
    heading: 'Give a difficult search another way forward.',
    intro: 'A limited local candidate pool or repeated recruitment cycle can leave important work uncovered. Offshore recruitment creates another sourcing path, with a dedicated person still working directly in your team.',
    context: 'Review why the role has been hard to fill. Separate essential experience from skills you can teach, and identify which responsibilities can be performed remotely. This makes the recruitment brief clearer without lowering the standards the job needs.',
    work: ['Clarify essential skills and the role’s daily responsibilities', 'Consider which work genuinely needs a local presence', 'Agree screening questions and interview criteria', 'Plan a consistent decision process for shortlisted candidates'],
    planning: 'iHire advertises through relevant local channels, reviews applicants and conducts initial interviews. You receive candidate profiles, choose who to meet and make the final selection. This reduces the sourcing and coordination work your business needs to handle directly.',
    scope: "Reach a wider talent pool with sourcing and screening handled by iHire. We discuss recruitment timing around your requirements and candidate availability, while you choose who joins your team.",
    roles: ['administration', 'customer-service', 'accounting-finance'], related: ['professional-services', 'healthcare']
  },
  {
    slug: 'extend-operating-hours', name: 'Extend operating hours',
    title: 'Extend operating hours with offshore staffing',
    description: 'Plan after-hours offshore staffing for monitoring, customer support and operational handovers, with agreed shifts and escalation procedures.',
    heading: 'Keep the right work moving after your day ends.',
    intro: 'Longer service hours need more than someone in a different time zone. Dedicated offshore coverage works best when shifts, systems, handovers and response responsibilities are planned together.',
    context: 'Our after-hours surveillance monitoring experience provides a practical example: an employee monitors agreed systems, documents observations and escalates events to nominated contacts. Similar planning principles apply to customer support or operational follow-up.',
    work: ['Define the coverage window in your business’s local time', 'Confirm seasonal clock changes and shift availability', 'Write escalation steps and name response contacts', 'Plan incoming and outgoing handovers, connectivity and backup'],
    planning: 'Start with the hours that would make a meaningful difference to your customers or operation. Define what can be resolved during the shift and what must wait for the local team. We recruit against the agreed requirements and scope the equipment and support needed.',
    scope: "Build coverage around the hours your business needs, with staffing levels, shifts, leave cover and infrastructure agreed from the outset.",
    roles: ['monitoring-after-hours', 'customer-service', 'operations'], related: ['security-monitoring', 'telecommunications', 'ecommerce']
  },
  {
    slug: 'access-specialist-skills', name: 'Access specialist skills',
    title: 'Access specialist skills through offshore staffing',
    description: 'Find dedicated offshore technical, digital or professional talent around a clear skills brief and an assessment led by your business.',
    heading: 'Look beyond your local pool for the skills you need.',
    intro: 'Sometimes the constraint is a particular skill rather than the number of people in your team. Offshore recruitment lets you explore candidates with relevant experience in another market.',
    context: 'A useful specialist brief explains the work, the tools and the judgement required. List the systems the person will use, examples of expected output and the level of independent responsibility. Avoid relying on a job title alone to communicate seniority.',
    work: ['Specify essential tools and practical experience', 'Define who provides technical or professional oversight', 'Use a relevant portfolio discussion or scoped assessment', 'Agree learning expectations, permissions and review standards'],
    planning: 'For an IT support role, describe your environment and escalation boundaries. For a developer, define the stack and delivery process. We screen for relevant experience, while your specialist lead assesses capability and fit before the selection.',
    scope: "We match the search to the skills you need, using our Sri Lanka operation and wider recruitment networks. Relevant experience, qualifications and practical capability guide candidate selection.",
    roles: ['it-support', 'software-development', 'digital-marketing', 'design-creative'], related: ['technology', 'professional-services']
  },
  {
    slug: 'build-an-offshore-team', name: 'Build an offshore team',
    title: 'Build an offshore team for your NZ or Australian business',
    description: 'Plan multiple dedicated offshore employees with clear roles, management, onboarding and support. Build your team with iHire Global.',
    heading: 'Build a team that belongs in your business.',
    intro: 'Hiring several offshore employees calls for more than repeating a single job description. Plan how the roles work together, who leads the team and how information moves between locations.',
    context: 'Map the work before deciding the headcount. Separate specialist responsibilities from shared administration, define approval authority and identify your local management capacity. A staged approach can give you time to establish working routines before adding more people.',
    work: ['Define the purpose and scope of each role', 'Set reporting lines and escalation responsibilities', 'Create shared onboarding and documentation routines', 'Plan equipment, access, meetings and overlapping hours'],
    planning: 'iHire recruits and screens for the agreed roles, coordinates your interviews and handles the employment arrangements and infrastructure for selected employees. Your business leads daily work, training and performance. Our own offshore team experience informs these practical conversations.',
    scope: 'Team size, recruitment sequence and timing depend on your requirements and suitable candidates. Management responsibility stays with you; ongoing iHire support covers agreed employment administration and local infrastructure.',
    roles: ['operations', 'administration', 'software-development'], related: ['technology', 'security-monitoring', 'professional-services']
  },
  {
    slug: 'improve-cost-efficiency', name: 'Improve cost efficiency',
    title: 'Improve staffing cost efficiency with offshore teams',
    description: 'Assess offshore staffing economics across role scope, employment, management time and infrastructure without relying on headline salary comparisons.',
    heading: 'Make the whole staffing cost work harder.',
    intro: 'Offshore staffing can improve employment economics while keeping a dedicated person in your team. A useful comparison considers the full arrangement, not just a salary figure.',
    context: 'Start with the outcomes the role must deliver. Compare the proposed staffing cost alongside recruitment effort, equipment, connectivity, onboarding and the management time your business will provide. A lower headline cost is only useful when the person can do the work you need.',
    work: ['Define responsibilities and the required experience level', 'Compare agreed monthly inclusions and separate setup charges', 'Allow for training, management and review time', 'Consider working hours, location and infrastructure requirements'],
    planning: 'iHire scopes your brief, recruits and validates the candidate market, then prepares an indicative quote for your review before you decide whether to proceed. Confirm which employment and support items are included and how equipment or additional infrastructure will be charged. Review the proposal against a consistent role scope so the comparison is meaningful.',
    scope: "Explore our starting monthly prices, then receive a quote tailored to your role, experience level, working hours and setup. Compare the full arrangement to understand the value for your business.",
    roles: ['accounting-finance', 'administration', 'operations'], related: ['professional-services', 'ecommerce']
  }
];
