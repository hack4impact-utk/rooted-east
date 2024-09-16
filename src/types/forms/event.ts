import { z } from 'zod';
// import zEvent from '../dataModel/event';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { zObjectId } from '../dataModel/base';

export const zTime = z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
  message: 'Invalid time format',
});

const zDayJs = z.custom<Dayjs>((val) => val instanceof dayjs, 'Invalid date');

export const zEventFormData = z
  .object({
    title: z.string(),
    location: z.string(),
    date: zDayJs,
    startTime: zTime,
    endTime: zTime,
    volsNeeded: z.number(),
    description: z.string(),
    manager: zObjectId,
  })
  .refine(
    (data) => {
      if (data.startTime >= data.endTime) {
        return false;
      }

      return true;
    },
    {
      path: ['startTime'],
      message: 'Start time must be before end time',
    }
  );

export interface EventFormData extends z.infer<typeof zEventFormData> {}
