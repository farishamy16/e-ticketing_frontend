'use client';

import EventForm from '@/components/EventForm';

export default function CreateEventPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Event</h1>
        <EventForm />
      </div>
    </div>
  );
} 