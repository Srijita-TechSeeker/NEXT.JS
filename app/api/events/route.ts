// app/api/events/route.ts

import { NextResponse } from "next/server";
import { db } from "../../lib/db";
import { events } from "../../lib/schema";

// POST: Create new event
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, description, date, location } = data;

    if (!title || !date || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await db.insert(events).values({
      title,
      description,
      date: new Date(date),
      location,
    });

    return NextResponse.json({ message: "Event created", event: result });
  } catch (err) {
    console.error("Error creating event:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET: Fetch all events
export async function GET() {
  try {
    const all = await db.select().from(events);
    return NextResponse.json(all);
  } catch (err) {
    console.error("Error fetching events:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
