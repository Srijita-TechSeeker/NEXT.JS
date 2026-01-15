'use client';

import Link from 'next/link';
import Image from 'next/image';

interface EventCardProps {
  event: {
    id: number;
    name: string;
    date: string;
    image: string;
  };
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`dashboard/events/${event.id}`}>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
        <div className="h-48 w-full relative">
          <Image
            src={event.image}
            alt={event.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-2xl"
          />
        </div>
        <div className="p-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">{event.name}</h3>
          <p className="text-sm text-gray-600">{event.date}</p>
        </div>
      </div>
    </Link>
  );
}
