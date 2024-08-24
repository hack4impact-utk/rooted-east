import { NextRequest, NextResponse } from 'next/server';
import { zObjectId } from '@/types/dataModel/base';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';
import { zUpdateEventRequest } from '@/types/dataModel/event';
import { updateEventAction } from '@/server/actions/Event';
import { UpdateEventRequest } from '@/types/dataModel/event';

export async function PUT(
  req: NextRequest,
  {
    params,
  }: { params: { eventId: string; eventUpdatesRequest: UpdateEventRequest } }
) {
  try {
    const idValidationResult = zObjectId.safeParse(params.eventId);
    if (!idValidationResult.success) {
      return new CMError(CMErrorType.BadValue, 'Event Id').toNextResponse();
    }

    const data = await req.json();
    const validationResult = zUpdateEventRequest.safeParse(data);
    if (!validationResult.success) {
      return new CMError(CMErrorType.BadValue, 'Event').toNextResponse();
    }
    await updateEventAction(params.eventId, params.eventUpdatesRequest);

    return new NextResponse(undefined, { status: 204 });
  } catch (e) {
    return CMErrorResponse(e);
  }
}
