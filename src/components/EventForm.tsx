import { useState } from 'react';
import { eventService } from '@/services/api';
import { useRouter } from 'next/navigation';

export default function EventForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    venue: '',
    total_tickets: 0,
    ticket_price: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await eventService.createEvent(formData);
      router.push(`/events/${response.data.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create event');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'total_tickets' || name === 'ticket_price' 
        ? parseFloat(value) 
        : value
    }));
  };

  // Get minimum date-time string for the date input (current time)
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <form onSubmit={handleSubmit} className="card-body">
        <h2 className="card-title text-2xl mb-6">Create New Event</h2>

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Event Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered"
              required
              placeholder="Enter event name"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Date and Time</span>
            </label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input input-bordered"
              required
              min={getMinDateTime()}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Venue</span>
            </label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              className="input input-bordered"
              required
              placeholder="Enter venue name"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Total Tickets</span>
            </label>
            <input
              type="number"
              name="total_tickets"
              value={formData.total_tickets || ''}
              onChange={handleChange}
              className="input input-bordered"
              required
              min="1"
              placeholder="Enter number of tickets"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Ticket Price ($)</span>
            </label>
            <input
              type="number"
              name="ticket_price"
              value={formData.ticket_price || ''}
              onChange={handleChange}
              className="input input-bordered"
              required
              min="0"
              step="0.01"
              placeholder="Enter ticket price"
            />
          </div>
        </div>

        <div className="card-actions justify-end mt-6">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  );
} 