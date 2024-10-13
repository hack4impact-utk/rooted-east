import { NextRequest, NextResponse } from 'next/server';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';
import { zObjectId } from '@/types/dataModel/base';
import { deleteEventVolunteer } from '@/server/actions/EventVolunteer';
import { zCheckInVolunteerRequest } from '@/types/dataModel/eventVolunteer';
import { zCheckOutVolunteerRequest } from '@/types/dataModel/eventVolunteer';
import { checkInVolunteer } from '@/server/actions/EventVolunteer';
import { checkOutVolunteer } from '@/server/actions/EventVolunteer';

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

    if (data.checkInTime != undefined) {
      const request = {
        eventVolunteerId: params.eventVolunteerId,
        checkInTime: data.checkInTime,
      };
      const validationResult = zCheckInVolunteerRequest.safeParse(request);
      if (!validationResult.success) {
        return new CMError(
          CMErrorType.BadValue,
          'EventVolunteer'
        ).toNextResponse();
      }
      await checkInVolunteer(request);
    } else if (data.checkOutTime != undefined) {
      const request = {
        eventVolunteerId: params.eventVolunteerId,
        checkOutTime: data.checkOutTime,
      };
      const validationResult = zCheckOutVolunteerRequest.safeParse(request);
      if (!validationResult.success) {
        return new CMError(
          CMErrorType.BadValue,
          'EventVolunteer'
        ).toNextResponse();
      }
      await checkOutVolunteer(request);
    } else {
      return new CMError(
        CMErrorType.BadValue,
        'checkInTime/checkOutTime'
      ).toNextResponse();
    }

    return new NextResponse(undefined, { status: 204 });
  } catch (e) {
    return CMErrorResponse(e);
  }
}
