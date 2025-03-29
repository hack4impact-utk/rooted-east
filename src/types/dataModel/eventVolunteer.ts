import { z } from 'zod';

import EventVolunteer from '@/server/models/EventVolunteer';
import { zObjectId } from './base';
import { zEventEntity } from './event';

const zEventVolunteer = z.object({
  volunteer: zObjectId,
  event: zObjectId,
  checkInTime: z.coerce.date().optional(),
  checkOutTime: z.coerce.date().optional(),
});

const zEventVolunteerEntity = zEventVolunteer.extend({
  _id: zObjectId,
});

export const zCreateEventVolunteerRequest = zEventVolunteer.extend({
  volunteer: zObjectId,
  event: zObjectId,
});

export const zCheckInVolunteerRequest = z.object({
  eventVolunteerId: zObjectId,
  checkInTime: z.union([z.coerce.date(), z.null()]),
});

export const zCheckOutVolunteerRequest = z.object({
  eventVolunteerId: zObjectId,
  checkOutTime: z.coerce.date(),
});

export const zEventVolunteerResponse = zEventVolunteer;

export const zEventVolunteerResponsePopulatedEvent =
  zEventVolunteerResponse.extend({
    event: zEventEntity,
  });

export interface EventVolunteer extends z.infer<typeof zEventVolunteer> {}
export interface CreateEventVolunteerRequest
  extends z.infer<typeof zCreateEventVolunteerRequest> {}
export interface CheckInVolunteerRequest
  extends z.infer<typeof zCheckInVolunteerRequest> {}

export default zEventVolunteer;
export interface EventVolunteerEntity
  extends z.infer<typeof zEventVolunteerEntity> {}
export interface CheckOutVolunteerRequest
  extends z.infer<typeof zCheckOutVolunteerRequest> {}
export interface EventVolunteerResponse
  extends z.infer<typeof zEventVolunteerResponse> {}
export interface EventVolunteerResponsePopulatedEvent
  extends z.infer<typeof zEventVolunteerResponsePopulatedEvent> {}
