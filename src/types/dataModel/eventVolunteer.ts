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

export interface EventVolunteer extends z.infer<typeof zEventVolunteer> {}
export interface CreateEventVolunteerRequest
  extends z.infer<typeof zCreateEventVolunteerRequest> {}

export default zEventVolunteer;
export interface EventVolunteerEntity
  extends z.infer<typeof zEventVolunteerEntity> {}
