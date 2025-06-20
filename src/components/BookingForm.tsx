import { Event } from '@/types';
import { bookingService } from '@/services/api';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BookingFormProps {
  event: Event;
}

export default function BookingForm({ event }: BookingFormProps) {
  const [numTickets, setNumTickets] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await bookingService.createBooking({
        event_id: event.id,
        num_of_tickets: numTickets,
      });
      router.push(`/bookings/${response.data.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create booking');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 1 : parseInt(e.target.value);
    if (!isNaN(value)) {
      setNumTickets(Math.max(1, Math.min(value, event.total_tickets)));
    }
  };

  const totalPrice = event.ticket_price * numTickets;

  return (
    <div className="card bg-base-100 shadow-xl">
      <form onSubmit={handleSubmit} className="card-body">
        <h2 className="card-title">Book Tickets</h2>
        
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        <div className="form-control">
          <label className="label">
            <span className="label-text">Number of Tickets</span>
          </label>
          <input
            type="number"
            min="1"
            max={event.total_tickets}
            value={numTickets}
            onChange={handleTicketChange}
            className="input input-bordered"
            required
          />
        </div>

        <div className="mt-4">
          <p className="text-lg font-semibold">
            Total Price: {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(totalPrice)}
          </p>
        </div>

        <div className="card-actions justify-end mt-4">
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={isLoading || numTickets < 1 || numTickets > event.total_tickets}
          >
            {isLoading ? 'Booking...' : 'Book Now'}
          </button>
        </div>
      </form>
    </div>
  );
} 