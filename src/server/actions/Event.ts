// import Event from '../models/Event';
// import { CreateEventRequest } from '@/types/dataModel/event';
//     //commented out because model does not exist currently
// import dbConnect from "@/utils/db-connect";
// import EventSchema from '@/server/models/Event';
//     //commented out for same reason as above

// export async function createEvent(
//     createEventReq: CreateEventRequest
// ): Promise<string> {
//     try {
//         await dbConnect();
//         const res = await Event.create(createEventReq);
//         if (!res) {
//             throw new Error('Event not created');
//         }
//         return res._id.toString();
//     } catch (e) {
//         throw e;
//     }
// }
