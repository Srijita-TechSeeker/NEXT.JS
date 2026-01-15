import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '../../../lib/db';
import { users } from '../../../lib/schema';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: 'User created' }, { status: 201 }); // ✅ always return JSON
  } catch (err) {
    console.error('Signup API error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); // ✅ even errors return JSON
  }
}
