import { z } from 'zod';
import zVolunteer from './volunteer';
import zEvent from './event';
import { zObjectId } from './base';

const zEventVolunteer = z.object({
  volunteer: zVolunteer,
  event: zEvent,
  checkInTime: z.date().optional(),
  checkOutTime: z.date().optional(),
});

const zEventVolunteerEntity = zEventVolunteer.extend({
  organization: zObjectId.optional(),
  volunteer: zObjectId,
  event: zObjectId,
});

export const zCreateEventVolunteerRequest = zEventVolunteer.extend({
  volunteer: zVolunteer,
  event: zEvent,
});

export const zCheckOutVolunteerRequest = z.object({
  eventVolunteerId: z.string(),
  checkOutTime: z.date(),
});

export const zEventVolunteerResponse = zEventVolunteer;

export interface EventVolunteer extends z.infer<typeof zEventVolunteer> {}
export interface CreateEventVolunteerRequest
  extends z.infer<typeof zCreateEventVolunteerRequest> {}

export default zEventVolunteer;
export interface EventVolunteerEntity
  extends z.infer<typeof zEventVolunteerEntity> {}
export interface CheckOutVolunteerRequest
  extends z.infer<typeof zCheckOutVolunteerRequest> {}
export interface EventVolunteerResponse
  extends z.infer<typeof zEventVolunteerResponse> {}
