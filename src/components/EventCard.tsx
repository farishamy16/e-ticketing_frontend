import { Event } from '@/types';
import { CalendarIcon, MapPinIcon, TicketIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{event.name}</h2>
        <div className="flex items-center gap-2 text-sm">
          <CalendarIcon className="h-5 w-5" />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPinIcon className="h-5 w-5" />
          <span>{event.venue}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <TicketIcon className="h-5 w-5" />
          <span>{event.total_tickets} tickets available at {formatPrice(event.ticket_price)}</span>
        </div>
        <div className="card-actions justify-end mt-4">
          <Link href={`/events/${event.id}`}>
            <button className="btn btn-primary">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
} 