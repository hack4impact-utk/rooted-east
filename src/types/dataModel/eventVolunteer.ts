import { z } from 'zod';
import zVolunteer from './volunteer';
import zEvent from './event';
import EventVolunteer from '@/server/models/EventVolunteer';

const zEventVolunteer = z.object({
  volunteer: zVolunteer,
  event: zEvent,
  checkInTime: z.date().optional(),
  checkOutTime: z.date().optional(),
});

export const zCreateEventVolunteerRequest = zEventVolunteer.extend({
  volunteer: zVolunteer,
  event: zEvent,
});

export const zCheckInVolunteerRequest = z.object({
  eventVolunteerId: z.string(),
  checkInTime: z.date(),
});

export interface EventVolunteer extends z.infer<typeof zEventVolunteer> {}
export interface CreateEventVolunteerRequest
  extends z.infer<typeof zCreateEventVolunteerRequest> {}
export interface CheckInVolunteerRequest
  extends z.infer<typeof zCheckInVolunteerRequest> {}

export default zEventVolunteer;
export interface EventVolunteerEntity extends z.infer<typeof zEventVolunteer> {}
