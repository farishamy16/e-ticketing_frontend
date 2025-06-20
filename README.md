# E-Ticketing Frontend

A modern web application built with Next.js for managing event bookings and tickets. This frontend application provides an intuitive interface for creating events, managing bookings, and handling ticket purchases.

## Features

- **Event Management**: Create, view, and manage events
- **Booking System**: Easy-to-use booking interface for event tickets
- **Responsive Design**: Built with Tailwind CSS and DaisyUI for a beautiful, responsive UI
- **Type Safety**: Written in TypeScript for better development experience

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-ticketing_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add necessary environment variables:
   ```env
   NEXT_PUBLIC_API_URL=your_backend_api_url
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Starts the development server with Turbopack
- `npm run build` - Creates a production build
- `npm run start` - Runs the production server
- `npm run lint` - Runs ESLint for code linting

## Project Structure

```
e-ticketing_frontend/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # Reusable React components
│   ├── lib/             # Utility functions and configurations
│   ├── services/        # API service functions
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
└── ...configuration files
```

## Key Components

- `EventCard.tsx`: Displays event information in a card format
- `EventForm.tsx`: Form component for creating/editing events
- `BookingForm.tsx`: Handles ticket booking process

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for production
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [DaisyUI](https://daisyui.com/) - Tailwind CSS component library
- [Axios](https://axios-http.com/) - HTTP client
- [Hero Icons](https://heroicons.com/) - Beautiful hand-crafted SVG icons
