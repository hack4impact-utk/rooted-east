import { z } from 'zod';

import EventVolunteer from '@/server/models/EventVolunteer';
import { zObjectId } from './base';

const zEventVolunteer = z.object({
  volunteer: zObjectId,
  event: zObjectId,
  checkInTime: z.date().optional(),
  checkOutTime: z.date().optional(),
});

const zEventVolunteerEntity = zEventVolunteer.extend({
  _id: zObjectId,
  volunteer: zObjectId,
  event: zObjectId,
});
export const zCreateEventVolunteerRequest = zEventVolunteer.extend({
  volunteer: zObjectId,
  event: zObjectId,
});

export const zCheckInVolunteerRequest = z.object({
  eventVolunteerId: z.string(),
});

export const zCheckOutVolunteerRequest = z.object({
  eventVolunteerId: z.string(),
  checkOutTime: z.date(),
});

export const zEventVolunteerResponse = zEventVolunteer;

export interface EventVolunteer extends z.infer<typeof zEventVolunteer> {}
export interface CreateEventVolunteerRequest
  extends z.infer<typeof zCreateEventVolunteerRequest> {}
export interface CheckInVolunteerRequest
  extends z.infer<typeof zCheckInVolunteerRequest> {}

export default zEventVolunteer;
// export interface EventVolunteerEntity
//   extends z.infer<typeof zEventVolunteerEntity> {}
export interface CheckOutVolunteerRequest
  extends z.infer<typeof zCheckOutVolunteerRequest> {}
export interface EventVolunteerResponse
  extends z.infer<typeof zEventVolunteerResponse> {}
