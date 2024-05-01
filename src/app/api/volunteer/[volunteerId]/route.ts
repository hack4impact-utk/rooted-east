import { updateVolunteer } from '@/server/actions/Volunteer';
import { zObjectId } from '@/types/dataModel/base';
import { zUpdateVolunteerRequest } from '@/types/dataModel/volunteer';
import CMError, { CMErrorResponse, CMErrorType } from '@/utils/cmerror';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  //request = name of the param
  //NextRequest = type ( like int )
  request: NextRequest,
  { params }: { params: { volunteerId: string } }
) {
  try {
    const objectIdValidationResult = zObjectId.safeParse(params.volunteerId);

    //if it is not valid
    if (!objectIdValidationResult.success) {
      return new CMError(CMErrorType.BadValue, 'Volunteer Id').toNextResponse();
    }

    // converting request (next request) | from above = request: NextRequest,
    //body is the body of the request (data from the request is in body)
    const body = await request.json();

    //checks to see if the request is valid or not
    const updateVolunteerRequestValidationResult =
      zUpdateVolunteerRequest.safeParse(body);
    //check for above
    if (!updateVolunteerRequestValidationResult.success) {
      return new CMError(CMErrorType.BadValue, 'Volunteer').toNextResponse();
    }

    // update the volunteer
    await updateVolunteer(
      params.volunteerId,
      updateVolunteerRequestValidationResult.data
    );

    return new NextResponse(undefined, { status: 204 });
  } catch (error) {
    return CMErrorResponse(error);
  }
}
