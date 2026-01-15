import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { events } from "../../../lib/schema";
import { eq } from "drizzle-orm";

// GET /api/events/:id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const eventId = Number(params.id);

  if (isNaN(eventId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const result = await db.select().from(events).where(eq(events.id, eventId));

    if (result.length === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 });
  }
}
