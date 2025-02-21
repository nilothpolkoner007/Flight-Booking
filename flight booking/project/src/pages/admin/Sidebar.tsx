import { Link } from 'react-router-dom';
import { Airplay, Building, Users, FileText, LogOut } from 'lucide-react';
import React, { FC } from 'react';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: FC<SidebarProps> = ({ onLogout }) => {
  return (
    <div className='h-screen w-64 bg-gray-900 text-white flex flex-col p-4'>
      <h2 className='text-xl font-bold mb-6'>Admin Panel</h2>
      <nav className='flex-1'>
        <ul>
          <li>
            <Link to='/admin/flights' className='flex items-center p-3 hover:bg-gray-700'>
              <Airplay className='mr-2' /> Manage Flights
            </Link>
          </li>
          <li>
            <Link to='/admin/hotels' className='flex items-center p-3 hover:bg-gray-700'>
              <Building className='mr-2' /> Manage Hotels
            </Link>
          </li>
          <li>
            <Link to='/admin/users' className='flex items-center p-3 hover:bg-gray-700'>
              <Users className='mr-2' /> Manage Users
            </Link>
          </li>
          <li>
            <Link to='/admin/summary' className='flex items-center p-3 hover:bg-gray-700'>
              <FileText className='mr-2' /> Summary
            </Link>
          </li>
        </ul>
      </nav>
      <button
        onClick={onLogout}
        className='flex items-center p-3 bg-red-600 rounded hover:bg-red-700'
      >
        <LogOut className='mr-2' /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
