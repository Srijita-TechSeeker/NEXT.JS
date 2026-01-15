import { db } from '../../../lib/db';
import { users } from '../../../lib/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const user = await db.select().from(users).where(eq(users.email, email));

  if (!user.length) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const match = await bcrypt.compare(password, user[0].password);
  if (!match) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // For now, return success. You can add JWT/session later.
  return NextResponse.json({ message: 'Login successful' }, { status: 200 });
}
