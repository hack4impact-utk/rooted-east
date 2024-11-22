import { NextRequest, NextResponse } from 'next/server';
import { getAllVolunteersForEvent } from '@/server/actions/Volunteer';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query') || '';
  const eventId = searchParams.get('eventId') || '';

  try {
    const volunteers = await getAllVolunteersForEvent(eventId);

    const filtered = volunteers.filter((volunteer) => {
      const fullName =
        `${volunteer.firstName} ${volunteer.lastName}`.toLowerCase();
      return fullName.includes(query.toLowerCase());
    });

    return NextResponse.json(filtered, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to search volunteers' },
      { status: 500 }
    );
  }
}
