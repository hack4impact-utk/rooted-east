import { z } from 'zod';

export const zObjectId = z.string();

const zBase = z.object({
  _id: zObjectId,
});

export interface Base extends z.infer<typeof zBase> {}

export default zBase;
