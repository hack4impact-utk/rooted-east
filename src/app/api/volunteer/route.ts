import { createVolunteer } from '@/server/actions/Volunteer';
import { NextRequest, NextResponse } from 'next/server';
import { zCreateVolunteerRequest } from '@/types/dataModel/volunteer';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';
import { getAdminVolunteers } from '@/server/actions/Volunteer';

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

export async function GET() {
  try {
    const volunteers = await getAdminVolunteers();
    return NextResponse.json(volunteers);
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
