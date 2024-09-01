import { z } from 'zod';
import { zObjectId } from './base';

const zEventVolunteer = z.object({
  volunteer: zObjectId,
  event: zObjectId,
  checkInTime: z.date().optional(),
  checkOutTime: z.date().optional(),
});

// const zEventVolunteerEntity = zEventVolunteer.extend({
//   _id: zObjectId,
//   volunteer: zObjectId,
//   event: zObjectId,
// });

export const zCreateEventVolunteerRequest = zEventVolunteer.extend({
  volunteer: zObjectId,
  event: zObjectId,
});

export interface EventVolunteer extends z.infer<typeof zEventVolunteer> {}
export interface CreateEventVolunteerRequest
  extends z.infer<typeof zCreateEventVolunteerRequest> {}

export default zEventVolunteer;
// export interface EventVolunteerEntity
//   extends z.infer<typeof zEventVolunteerEntity> {}
