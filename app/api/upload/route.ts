import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { db } from '../../lib/db';
import { media } from '../../lib/schema';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const eventId = formData.get('eventId');

  if (!file || !eventId) {
    return NextResponse.json({ error: 'Missing file or eventId' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  await mkdir(uploadsDir, { recursive: true });

  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(uploadsDir, filename);
  await writeFile(filepath, buffer);

  await db.insert(media).values({
    filename,
    originalName: file.name,
    eventId: Number(eventId),
  });

  return NextResponse.json({ message: 'Upload successful', filename });
}
