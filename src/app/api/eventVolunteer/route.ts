import { createEventVolunteer } from '@/server/actions/Event';
import { NextRequest, NextResponse } from 'next/server';
import {
  zCheckInVolunteerRequest,
  zCreateEventVolunteerRequest,
} from '@/types/dataModel/eventVolunteer';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';
import { zObjectId } from '@/types/dataModel/base';
import { checkInVolunteerAction } from '@/server/actions/EventVolunteer';

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const validationResult = zCreateEventVolunteerRequest.safeParse(req);
    if (!validationResult.success) {
      return new CMError(CMErrorType.BadValue, 'Volunteer').toNextResponse();
    }

    const res = await createEventVolunteer(validationResult.data);
    return NextResponse.json({ id: res }, { status: 201 });
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
