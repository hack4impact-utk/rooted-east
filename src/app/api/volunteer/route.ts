import { createVolunteer } from '@/server/actions/Volunteer';
import { NextRequest, NextResponse } from 'next/server';
import { zCreateVolunteerRequest } from '@/types/dataModel/volunteer';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const validationResult = zCreateVolunteerRequest.safeParse(req);
    if (!validationResult.success) {
      return new CMError(CMErrorType.BadValue, 'Volunteer').toNextResponse();
    }

    const res = await createVolunteer(validationResult.data);
    return NextResponse.json({ id: res }, { status: 201 });
  } catch (error) {
    return CMErrorResponse(error);
  }
}
