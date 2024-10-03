import { z } from 'zod';
// import zDemographic from './demographic';
import zBase from './base';

export const roles = ['Volunteer', 'Manager', 'Admin'] as const;
const zRole = z.enum(roles);

const zVolunteer = z.object({
  firstName: z.string(),
  lastName: z.string(),
  role: zRole,
  email: z.string().email(),
  phoneNumber: z.string(),

  address: z.string().optional(),
  zipCode: z.string().optional(),
  preferredContactMethod: z.string().optional(),
  raceEthnicity: z.string().optional(),
  gender: z.string().optional(),
  pronoun: z.string().optional(),
  ageBracket: z.string().optional(),
  renterHomeowner: z.string().optional(),
  householdOccupants: z.string().optional(),
  children0to12: z.string().optional(),
  children13to18: z.string().optional(),
  seniors60plus: z.string().optional(),
  snap: z.string().optional(),
  wic: z.string().optional(),
  income: z.string().optional(),
  occupation: z.string().optional(),
  otherSkills: z.string().optional(),

  active: z.string().optional(),
  cohort: z.string().optional(),
  cohortYear: z.string().optional(),
  HGP_Phase2_member: z.string().optional(),
  reasonForLeaving: z.string().optional(),
  notes: z.string().optional(),
  gardeningExperience: z.string().optional(),
  growingSpace: z.string().optional(),
  gardenInfrastructure: z.string().optional(),
  formCreationDate: z.string().optional(),
});

export const zVolunteerResponse = zVolunteer.extend({ ...zBase.shape });

export const zCreateVolunteerRequest = zVolunteer.partial();

export const zUpdateVolunteerRequest = zVolunteer.partial();

export interface Volunteer extends z.infer<typeof zVolunteer> {}
export interface UpdateVolunteerRequest
  extends z.infer<typeof zUpdateVolunteerRequest> {}
export interface CreateVolunteerRequest
  extends z.infer<typeof zCreateVolunteerRequest> {}

export default zVolunteer;
export interface VolunteerResponse extends z.infer<typeof zVolunteerResponse> {}
