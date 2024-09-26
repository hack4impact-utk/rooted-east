import { NextRequest, NextResponse } from 'next/server';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';
import { zObjectId } from '@/types/dataModel/base';
import { deleteEvent } from '@/server/actions/Event';
import { zUpdateEventRequest } from '@/types/dataModel/event';
import { updateEventAction } from '@/server/actions/Event';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    const validationResult = zObjectId.safeParse(params.eventId);
    if (!validationResult.success) {
      return new CMError(CMErrorType.BadValue, 'Event Id').toNextResponse();
    }

    await deleteEvent(params.eventId);

    return new NextResponse(undefined, { status: 204 });
  } catch (error) {
    return CMErrorResponse(error);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { eventId: string } }
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
    await updateEventAction(params.eventId, data);

    return new NextResponse(undefined, { status: 204 });
  } catch (e) {
    return CMErrorResponse(e);
  }
}
