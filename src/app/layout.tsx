import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Ticketing Platform",
  description: "Book tickets for your favorite events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.className}>
        <div className="drawer">
          <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
          <div className="drawer-content flex flex-col">
            {/* Navbar */}
            <div className="w-full navbar bg-base-300">
              <div className="flex-none lg:hidden">
                <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </label>
              </div> 
              <div className="flex-1 px-2 mx-2">
                <Link href="/" className="text-xl font-bold">E-Ticketing</Link>
              </div>
              <div className="flex-none hidden lg:block">
                <ul className="menu menu-horizontal gap-2">
                  <li><Link href="/" className="btn btn-primary">Events</Link></li>
                  <li><Link href="/events/create" className="btn btn-primary">Create Event</Link></li>
                </ul>
              </div>
            </div>
            {/* Page content */}
            {children}
          </div> 
          <div className="drawer-side">
            <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
            <ul className="menu p-4 w-80 min-h-full bg-base-200">
              <li><Link href="/">Events</Link></li>
              <li><Link href="/events/create">Create Event</Link></li>
            </ul>
          </div>
        </div>
      </body>
    </html>
  );
}
