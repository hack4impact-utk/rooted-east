import { Volunteer, roles } from '@/types/dataModel/volunteer';
import { Model, Schema, model, models } from 'mongoose';

const VolunteerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: roles,
  },
  address: {
    type: String,
    required: false,
  },
  zipCode: {
    type: String,
    required: false,
  },
  preferredContactMethod: {
    type: String,
    required: false,
  },
  raceEthnicity: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  pronoun: {
    type: String,
    required: false,
  },
  ageBracket: {
    type: String,
    required: false,
  },
  renterHomeowner: {
    type: String,
    required: false,
  },
  householdOccupants: {
    type: String,
    required: false,
  },
  children0to12: {
    type: String,
    required: false,
  },
  children13to18: {
    type: String,
    required: false,
  },
  seniors60plus: {
    type: String,
    required: false,
  },
  snap: {
    type: String,
    required: false,
  },
  wic: {
    type: String,
    required: false,
  },
  income: {
    type: String,
    required: false,
  },
  occupation: {
    type: String,
    required: false,
  },
  otherSkills: {
    type: String,
    required: false,
  },

  active: {
    type: String,
    required: false,
  },
  cohort: {
    type: String,
    required: false,
  },
  cohortYear: {
    type: String,
    required: false,
  },
  HGP_Phase2_member: {
    type: String,
    required: false,
  },
  reasonForLeaving: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  gardeningExperience: {
    type: String,
    required: false,
  },
  growingSpace: {
    type: String,
    required: false,
  },
  gardenInfrastructure: {
    type: String,
    required: false,
  },
  formCreationDate: {
    type: String,
    required: false,
  },
});

export type VolunteerDocument = Volunteer & Document;

export default (models.Volunteer as Model<VolunteerDocument>) ||
  model<VolunteerDocument>('Volunteer', VolunteerSchema);
