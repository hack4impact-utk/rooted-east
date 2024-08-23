import { NextRequest, NextResponse } from 'next/server';
import { zObjectId } from '@/types/dataModel/base';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';
import { zCheckInVolunteerRequest } from '@/types/dataModel/eventVolunteer';
import { checkInVolunteerAction } from '@/server/actions/EventVolunteer';

export async function PUT(
  req: NextRequest,
  { params }: { params: { eventVolunteerId: string; checkInTime: Date } }
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
