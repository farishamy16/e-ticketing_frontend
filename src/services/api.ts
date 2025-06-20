import apiClient from '@/lib/axios';
import { Event, Booking } from '@/types';

export const eventService = {
  getAllEvents: () => apiClient.get<Event[]>('/event'),
  getEventById: (id?: string) => id ? apiClient.get<Event>(`/event/${id}`) : apiClient.get<Event>('/event'),
  createEvent: (data: Omit<Event, 'id' | 'created_at' | 'user_id'>) => 
    apiClient.post<Event>('/event', data),
};

export const bookingService = {
  createBooking: (data: { event_id?: string; num_of_tickets: number }) =>
    apiClient.post<Booking>('/book', data),
  getBookingById: (id?: string) => id ? apiClient.get<Booking>(`/book/${id}`) : apiClient.get<Booking>('/book'),
  cancelBooking: (id?: string) => id ? apiClient.delete(`/book/${id}`) : apiClient.delete('/book'),
}; 