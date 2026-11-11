import { equipmentOptions, startTimeframes, talentPreferences } from '../data/business';

/** Staffing enquiry draft shared by the browser review and email form. */
export interface StaffingEnquiry {
  schemaVersion: 1;
  source: 'public-website';
  client: { companyName: string; country: string };
  contact: { name: string; workEmail: string; phone: string };
  requirement: {
    roleTitle: string;
    headcount: number;
    responsibilities: string;
    requiredSkills: string;
    requiredExperience: string;
    workingHours: string;
    startTimeframe: string;
    preferredLocation: string;
    equipmentRequirements: string[];
    connectivityRequirements: string;
    notes: string;
  };
}

export function createEnquiryDraft(data: FormData): StaffingEnquiry {
  const value = (key: string) => String(data.get(key) ?? '').trim();
  return {
    schemaVersion: 1,
    source: 'public-website',
    client: { companyName: value('company_name'), country: value('country') },
    contact: { name: value('contact_name'), workEmail: value('work_email'), phone: value('phone') },
    requirement: {
      roleTitle: value('role_title'), headcount: Number(value('headcount')),
      responsibilities: value('responsibilities'), requiredSkills: value('required_skills'),
      requiredExperience: value('required_experience'), workingHours: value('working_hours'),
      startTimeframe: value('start_timeframe'), preferredLocation: value('preferred_location'),
      equipmentRequirements: data.getAll('equipment_requirements').map(String),
      connectivityRequirements: value('connectivity_requirements'),
      notes: value('notes'),
    },
  };
}

export function enquiryBriefRows(draft: StaffingEnquiry): [string, string | number][] {
  const label = (options: readonly (readonly [string, string])[], value: string) => options.find(([key]) => key === value)?.[1] ?? value;
  const r = draft.requirement;
  const sections: [string, string | number][] = [
    ['Name', draft.contact.name], ['Company', draft.client.companyName],
    ['Work email', draft.contact.workEmail], ['Phone', draft.contact.phone], ['Country', label([['NZ','New Zealand'],['AU','Australia'],['OTHER','Other']], draft.client.country)],
    ['Role / job title', r.roleTitle], ['Number of people required', r.headcount],
    ['Main responsibilities', r.responsibilities], ['Required skills', r.requiredSkills],
    ['Required experience', r.requiredExperience], ['Preferred working hours', r.workingHours],
    ['Desired start timeframe', label(startTimeframes, r.startTimeframe)],
    ['Preferred talent location', label(talentPreferences, r.preferredLocation)],
    ['Equipment / infrastructure', r.equipmentRequirements.map(value => label(equipmentOptions, value)).join('; ')],
    ['Connectivity requirements', r.connectivityRequirements],
    ['Additional information', r.notes],
  ];
  return sections;
}

export function formatEnquiryBrief(draft: StaffingEnquiry): string {
  return 'iHire Global — staffing requirement draft\nNot submitted. This is a local brief, not a quote or a commitment.\n\n'
    + enquiryBriefRows(draft).map(([name, value]) => `${name}: ${value || 'Not specified'}`).join('\n\n');
}
