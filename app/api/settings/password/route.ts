import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { users } from '../../../lib/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { currentPassword, newPassword } = await req.json();
  const userId = 1; // Replace with actual session user ID

  const user = await db.select().from(users).where(eq(users.id, userId)).then(res => res[0]);

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const passwordMatch = await bcrypt.compare(currentPassword, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ message: 'Incorrect current password' }, { status: 401 });
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await db.update(users).set({ password: hashed }).where(eq(users.id, userId));

  return NextResponse.json({ message: 'Password updated successfully' });
}
