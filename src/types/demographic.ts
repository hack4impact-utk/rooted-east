import { z } from 'zod';

const zDemographic = z.object({
  age: z.number(),
  race: z.string(),
  sex: z.string(),
  income: z.number(),
  zipcode: z.number(),
  occupation: z.string(),
});

export interface Demographic extends z.infer<typeof zDemographic> {}

export default zDemographic;
