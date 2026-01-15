// app/api/attendees/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../lib/db';
import { attendees } from '../../lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, eventId } = body;

    if (!name || !email || !eventId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const result = await db.insert(attendees).values({
      name,
      email,
      eventId: Number(eventId),
    });

    return NextResponse.json({ message: 'Attendee registered', result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to register attendee' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('eventId');

    if (!eventId) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }

    const data = await db
      .select()
      .from(attendees)
      .where(eq(attendees.eventId, Number(eventId)));

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch attendees' }, { status: 500 });
  }
}
