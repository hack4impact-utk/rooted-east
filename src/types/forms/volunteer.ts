import { z } from 'zod';
import zVolunteer, { zVolunteerResponse } from '../dataModel/volunteer';

export interface NewVolunteerFormData extends z.infer<typeof zVolunteer> {}

export interface UpdateVolunteerFormData
  extends z.infer<typeof zVolunteerResponse> {}
