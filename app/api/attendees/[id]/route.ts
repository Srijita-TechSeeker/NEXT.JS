// app/api/attendees/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { attendees } from '../../../lib/schema';
import { eq } from 'drizzle-orm';

// DELETE /api/attendees/:id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid attendee ID' }, { status: 400 });
    }

    await db.delete(attendees).where(eq(attendees.id, id));

    return NextResponse.json({ message: 'Attendee deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete attendee' }, { status: 500 });
  }
}



export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const body = await req.json();

  const { name, email } = body;

  if (!name || !email) {
    return new Response(JSON.stringify({ error: 'Missing name or email' }), { status: 400 });
  }

  await db.update(attendees)
    .set({ name, email })
    .where(eq(attendees.id, id));

  return new Response(JSON.stringify({ message: 'Attendee updated successfully' }), { status: 200 });
}
