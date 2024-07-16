import { z } from 'zod';
import zVolunteer from '../dataModel/volunteer';

export interface NewVolunteerFormData extends z.infer<typeof zVolunteer> {}
