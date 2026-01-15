import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { users } from '../../../lib/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(req: NextRequest) {
  const userId = 1; // Replace with session user ID
  try {
    await db.delete(users).where(eq(users.id, userId));
    return NextResponse.json({ message: 'Account deleted' });
  } catch (err) {
    return NextResponse.json({ message: 'Failed to delete account' }, { status: 500 });
  }
}
