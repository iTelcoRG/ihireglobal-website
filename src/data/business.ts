/** Approved public details only. Null values deliberately keep placeholders visible. */
export const business = {
  contact: {
    email: null as string | null,
    phone: null as string | null,
    phoneHref: null as string | null,
    address: null as string | null,
    availability: null as string | null,
  },
  enquiry: { mode: 'local-brief' as const },
};

export const ctas = {
  general: 'Find Talent',
  pricing: 'Get an Indicative Quote',
  supporting: 'How It Works',
};

export const talentPreferences = [
  ['no_preference', 'No preference'],
  ['sri_lanka', 'Sri Lanka'],
  ['philippines', 'Philippines'],
  ['india', 'India'],
  ['fiji', 'Fiji'],
  ['recommendation', 'Open to recommendation'],
] as const;

export const equipmentOptions = [
  ['standard_laptop', 'Standard laptop setup'],
  ['additional_monitors', 'Additional monitor(s)'],
  ['headset', 'Headset'],
  ['specialist_hardware', 'Specialist hardware'],
  ['connectivity', 'Connectivity requirements'],
  ['power_backup', 'UPS / power backup'],
  ['recommend_setup', 'Unsure / recommend a setup'],
] as const;

export const startTimeframes = [
  ['exploring', 'Still exploring'],
  ['as_practical', 'As soon as practical'],
  ['one_to_three_months', 'Within 1–3 months'],
  ['three_to_six_months', 'Within 3–6 months'],
] as const;
