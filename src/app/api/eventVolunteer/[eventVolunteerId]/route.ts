import { NextRequest, NextResponse } from 'next/server';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';
import { zObjectId } from '@/types/dataModel/base';
import { deleteEventVolunteer } from '@/server/actions/EventVolunteer';
import { zCheckInVolunteerRequest } from '@/types/dataModel/eventVolunteer';
import { checkInVolunteerAction } from '@/server/actions/EventVolunteer';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { eventVolunteerId: string } }
) {
  try {
    const validationResult = zObjectId.safeParse(params.eventVolunteerId);
    if (!validationResult.success) {
      return new CMError(
        CMErrorType.BadValue,
        'EventVolunteer Id'
      ).toNextResponse();
    }
    await deleteEventVolunteer(params.eventVolunteerId);

    return new NextResponse(undefined, { status: 204 });
  } catch (error) {
    return CMErrorResponse(error);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { eventVolunteerId: string } }
) {
  try {
    const idValidationResult = zObjectId.safeParse(params.eventVolunteerId);
    if (!idValidationResult.success) {
      return new CMError(
        CMErrorType.BadValue,
        'EventVolunteer Id'
      ).toNextResponse();
    }

    const data = await req.json();
    const validationResult = zCheckInVolunteerRequest.safeParse(data);
    if (!validationResult.success) {
      return new CMError(
        CMErrorType.BadValue,
        'EventVolunteer'
      ).toNextResponse();
    }
    await checkInVolunteerAction(params);

    return new NextResponse(undefined, { status: 204 });
  } catch (e) {
    return CMErrorResponse(e);
  }
}
