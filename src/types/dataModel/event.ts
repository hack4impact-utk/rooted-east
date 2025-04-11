import { z } from 'zod';
import { zObjectId } from './base';
// import dayjs from 'dayjs';
// import type { Dayjs } from 'dayjs';

export const zTime = z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
  message: 'Invalid time format',
});

import { EventVolunteerEntity } from './eventVolunteer';
import { VolunteerEntity, zVolunteerEntity } from '@/types/dataModel/volunteer';
// const zDayJs = z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date');

const zEvent = z.object({
  title: z.string(),
  location: z.string(),
  day: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  volsNeeded: z.number(),
  volsSignUp: z.number(),
  description: z.string(),
  manager: zObjectId,
});

export const zEventEntity = zEvent.extend({
  _id: zObjectId,
});

export interface EventVolVol {
  vol: VolunteerEntity;
  eVol: EventVolunteerEntity;
}

export const zEventResponsePopulatedManager = zEventEntity.extend({
  manager: zVolunteerEntity,
});

export interface EventResponsePopulatedManager
  extends z.infer<typeof zEventResponsePopulatedManager> {}

export const zCreateEventRequest = zEvent.omit({ volsSignUp: true });

export const zUpdateEventRequest = zEvent.partial();

export interface Event extends z.infer<typeof zEvent> {}
export interface CreateEventRequest
  extends z.infer<typeof zCreateEventRequest> {}
export interface UpdateEventRequest
  extends z.infer<typeof zUpdateEventRequest> {}

export interface EventEntity extends z.infer<typeof zEventEntity> {}

export default zEvent;
