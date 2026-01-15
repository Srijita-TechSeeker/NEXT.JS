import { NextResponse } from 'next/server';
import { db } from '../../lib/db';
import { media } from '../../lib/schema';

export async function GET() {
  const items = await db.select().from(media);
  return NextResponse.json(items);
}
