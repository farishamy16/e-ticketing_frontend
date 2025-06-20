'use client';

import { useEffect, useState, use } from 'react';
import { Event } from '@/types';
import { eventService } from '@/services/api';
import BookingForm from '@/components/BookingForm';
import { CalendarIcon, MapPinIcon, TicketIcon } from '@heroicons/react/24/outline';

export default function EventPage({ params }: { params: Promise<{ id?: string }> }) {
  const resolvedParams = use(params);
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (!resolvedParams.id) {
          setError('Event ID is required');
          setIsLoading(false);
          return;
        }
        const response = await eventService.getEventById(resolvedParams.id);
        setEvent(response.data);
      } catch (err: any) {
        setError('Failed to load event details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [resolvedParams.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen p-8">
        <div className="alert alert-error">
          <span>{error || 'Event not found'}</span>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h1 className="card-title text-3xl mb-6">{event.name}</h1>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-6 w-6" />
                <span className="text-lg">{formatDate(event.date)}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPinIcon className="h-6 w-6" />
                <span className="text-lg">{event.venue}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <TicketIcon className="h-6 w-6" />
                <span className="text-lg">
                  {event.total_tickets} tickets available at {
                    new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(event.ticket_price)
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        <BookingForm event={event} />
      </div>
    </div>
  );
} 