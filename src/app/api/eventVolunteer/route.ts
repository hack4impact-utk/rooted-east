import { createEventVolunteer } from '@/server/actions/Event';
import { NextRequest, NextResponse } from 'next/server';
import { zCreateEventVolunteerRequest } from '@/types/dataModel/eventVolunteer';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';

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
