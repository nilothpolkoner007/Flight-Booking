import React, { useState } from 'react';

import { Plane, Bed, Users, FileText } from 'lucide-react';
import Sidebar from './Sidebar';
import ManageFlights from './ManageFlights';
import ManageHotels from './ManageHotels';
import ManageUsers from './ManageUser';

const pages = [
  { name: 'Flight Selection', component: <ManageFlights />, icon: Plane },
  { name: 'Hotel Selection', component: <ManageHotels />, icon: Bed },
  { name: 'User Management', component: <ManageUsers />, icon: Users },
  { name: 'Summary Page', component: <SummaryPage />, icon: FileText },
];

export default function Dashboard() {
  const [activePage] = useState('Flight Selection');

  const renderContent = () => {
    return pages.find((page) => page.name === activePage)?.component || <div>Select a page</div>;
  };

  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <Sidebar onLogout={() => console.log('Logout clicked')} />

      {/* Main Content */}
      <main className='flex-1 p-6 bg-gray-100'>{renderContent()}</main>
    </div>
  );
}

// Summary Page Component
function SummaryPage() {
  return (
    <div className='p-6 bg-white shadow rounded-lg'>
      <h1 className='text-2xl font-bold mb-4'>Admin Summary</h1>
      <p>Overview of bookings, revenue, and statistics will go here.</p>
    </div>
  );
}
