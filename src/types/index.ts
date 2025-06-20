export interface Event {
  id: string;
  name: string;
  date: string;
  venue: string;
  total_tickets: number;
  ticket_price: number;
  created_at: string;
  user_id: string;
}

export interface Booking {
  id: string;
  num_of_tickets: number;
  total_price: number;
  created_at: string;
  event_id: string;
  user_id: string;
  event?: Event;
}

export interface User {
  id: string;
  email: string;
  is_vip: boolean;
  created_at: string;
} 