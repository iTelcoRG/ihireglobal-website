/** Starting monthly NZD prices confirmed by the owner on 7 November 2026.
 * Source: https://www.ihireglobal.com/pricing
 * Hours and equipment/infrastructure inclusions are agreed in each quote.
 */
export const pricingExamples: { title: string; description: string; monthlyGuidance: string; image: string; imageAlt: string; factors: string }[] = [
  { title: 'Entry Level', description: 'Support for everyday tasks and growing teams.', monthlyGuidance: 'From NZ$800', image: '/images/pricing/entry-level.webp', imageAlt: 'AI-generated illustration of an administrative professional working at a laptop', factors: 'Example roles: Virtual Administrative Assistant, Customer Support Representative, Data Entry Clerk, Social Media Coordinator and Junior Project Manager.' },
  { title: 'Mid Level', description: 'Experienced people with more independent responsibility.', monthlyGuidance: 'From NZ$1,500', image: '/images/pricing/mid-level.webp', imageAlt: 'AI-generated illustration of a specialist reviewing a dashboard and project notes', factors: 'Example roles: Software Developer, Social Media Manager, Project Manager, Operations Manager and Accountant.' },
  { title: 'Senior Level', description: 'Specialist expertise and experienced leadership.', monthlyGuidance: 'From NZ$2,500', image: '/images/pricing/senior-level.webp', imageAlt: 'AI-generated illustration of a senior professional leading a planning discussion', factors: 'Example roles: Senior Software Engineer, Digital Marketing Manager, IT Manager, Senior Financial Analyst and E-commerce Manager.' },
];

export const primaryProcess = [
  ['Tell us what you need', 'We understand the role, responsibilities, skills, experience and setup requirements.'],
  ['We find and screen candidates', 'We advertise, source, review, interview and shortlist suitable candidates.'],
  ['You interview and choose', 'Review profiles, meet shortlisted people and select the right fit for your team.'],
  ['We employ, set up and support', 'We manage employment, payroll, equipment, connectivity and ongoing employment administration. You lead the daily work.'],
];

export const operationalProof = [
  { title: 'We use the model ourselves.', body: 'Our offshore roles include Operations Manager, Digital Marketing Manager and Digital Platforms Manager.', href: '/use-cases/#internal-team', link: 'Meet the kinds of roles we use' },
  { title: 'Established in Sri Lanka.', body: 'An existing operation supporting recruitment, employment administration and the practical setup around a dedicated employee.', href: '/talent-locations/sri-lanka/', link: 'Explore our operation' },
];

/** Customer testimonials supplied by the owner on 7 November 2026; spelling and punctuation lightly edited. */
export const approvedCustomerProof: {
  logos: { name: string; src: string }[];
  quotes: { quote: string; attribution: string; company: string }[];
  outcomes: { title: string; description: string }[];
} = { logos: [], quotes: [
  {
    "quote": "We’re stoked with the team of 5 that iHire have found for us! The team are amazing, dedicated and great to work with! Totally recommend iHire if you’re looking to reduce costs and hire dedicated team members.",
    "attribution": "Ran",
    "company": "Wolfguard"
  },
  {
    "quote": "We hired 4 admin staff to assist with D2D verification. This made our sales reps’ work so much easier, and we could go through all the information we needed with the customer on the phone. Best part, iHire provide phone solutions to allow the team to make and receive calls. A total one-stop shop.",
    "attribution": "Nakul",
    "company": "Excel Sales"
  },
  {
    "quote": "We hired a website administrator to manage all the products and pricing. We absolutely love Dewsha. She has been amazing and gets on with it. One less thing for us to worry about; it just gets done.",
    "attribution": "Ben",
    "company": "Rako Controls"
  },
  {
    "quote": "We recently engaged with iHire for a short-term project to help us get our new site up and running. From helping with the web design to managing products, it was perfect to get us off the ground.",
    "attribution": "Wayne",
    "company": "Online Wholesale"
  }
], outcomes: [] };
