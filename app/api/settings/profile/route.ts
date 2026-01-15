import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { users } from '../../../lib/schema'; // assume you have a users table
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();

  try {
    // NOTE: Replace `userId = 1` with session/user ID from auth
    await db.update(users)
      .set({ name, email })
      .where(eq(users.id, 1)); // <--- Fake hardcoded user ID

    return NextResponse.json({ message: 'Updated' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
