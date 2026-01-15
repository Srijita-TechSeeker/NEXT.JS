import { NextResponse } from 'next/server';
import { db } from '../../lib/db';
import { attendees, events } from '../../lib/schema';
import { count, eq } from 'drizzle-orm';

export async function GET() {
  try {
    const allEvents = await db.select().from(events);

    const analytics = await Promise.all(
      allEvents.map(async (event) => {
        const attendeeCount = await db
          .select({ value: count() })
          .from(attendees)
          .where(eq(attendees.eventId, event.id));

        return {
          id: event.id,
          title: event.title,
          attendeeCount: attendeeCount[0].value,
        };
      })
    );

    return NextResponse.json(analytics);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to load analytics' }, { status: 500 });
  }
}
