'use client';

import { useEffect, useState, use } from 'react';
import { Booking } from '@/types';
import { bookingService } from '@/services/api';
import { CalendarIcon, MapPinIcon, TicketIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function BookingPage({ params }: { params: Promise<{ id?: string }> }) {
  const resolvedParams = use(params);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        if (!resolvedParams.id) {
          setError('Booking ID is required');
          setIsLoading(false);
          return;
        }
        const response = await bookingService.getBookingById(resolvedParams.id);
        setBooking(response.data);
      } catch (err: any) {
        setError('Failed to load booking details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [resolvedParams.id]);

  const handleCancelBooking = async () => {
    if (!booking) return;
    
    setIsCancelling(true);
    try {
      await bookingService.cancelBooking(booking.id);
      router.push('/'); // Redirect to home page after cancellation
    } catch (err: any) {
      setError('Failed to cancel booking');
      setIsCancelling(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error || !booking || !booking.event) {
    return (
      <div className="min-h-screen p-8">
        <div className="alert alert-error">
          <span>{error || 'Booking not found'}</span>
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
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title text-3xl mb-6">Booking Details</h1>
            
            <div className="space-y-6">
              <div className="divider">Event Information</div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">{booking.event.name}</h2>
                
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-6 w-6" />
                  <span className="text-lg">{formatDate(booking.event.date)}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPinIcon className="h-6 w-6" />
                  <span className="text-lg">{booking.event.venue}</span>
                </div>
              </div>

              <div className="divider">Booking Information</div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <TicketIcon className="h-6 w-6" />
                  <span className="text-lg">{booking.num_of_tickets} tickets</span>
                </div>
                
                <p className="text-lg">
                  Total Price: {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(booking.total_price)}
                </p>
                
                <p className="text-sm text-gray-600">
                  Booked on: {formatDate(booking.created_at)}
                </p>
              </div>

              <div className="card-actions justify-end mt-6">
                <button
                  className="btn btn-error"
                  onClick={handleCancelBooking}
                  disabled={isCancelling}
                >
                  {isCancelling ? 'Cancelling...' : 'Cancel Booking'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 