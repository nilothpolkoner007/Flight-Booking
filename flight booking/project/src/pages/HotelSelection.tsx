import React, { useEffect, useState } from 'react';
import { MapPin, Calendar, Star, Users } from 'lucide-react';

interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  guests: number;
  price: number;
  image: string;
}

interface HotelSelectionProps {
  onContinue: (hotelId: number) => void;
}

export function HotelSelection({ onContinue }: HotelSelectionProps) {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('/api/hotels');
        if (!response.ok) {
          throw new Error('Failed to fetch hotels');
        }
        const data = await response.json();
        setHotels(data);
      } catch (err) {
        setError('Error fetching hotel data.');
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div className='space-y-6'>
      {/* Hotel Search */}
      <div
        className='absolute z-[2147483647] box-border pointer-events-auto border-2 border-[#2ba6ff] rounded-md bg-gradient-to-r from-[rgba(43,166,255,0.4)] to-[rgba(26,100,153,0.15)] transition-opacity duration-200 will-change-[opacity] opacity-100 p-4'
        style={{ top: '64px', left: '0px', width: '918.4px', height: '109.6px' }}
      >
        <div className='grid grid-cols-3 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Location</label>
            <div className='mt-1 relative rounded-md shadow-sm'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <MapPin className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='text'
                className='focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
                placeholder='Search location'
              />
            </div>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Check-in</label>
            <div className='mt-1 relative rounded-md shadow-sm'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Calendar className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='date'
                className='focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
              />
            </div>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Check-out</label>
            <div className='mt-1 relative rounded-md shadow-sm'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Calendar className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='date'
                className='focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hotel Results */}
      <div className='grid grid-cols-3 gap-6'>
        {loading ? (
          <p className='text-gray-600'>Loading hotels...</p>
        ) : error ? (
          <p className='text-red-500'>{error}</p>
        ) : (
          hotels.map((hotel) => (
            <div key={hotel.id} className='bg-white rounded-lg shadow overflow-hidden'>
              <img src={hotel.image} alt={hotel.name} className='w-full h-48 object-cover' />
              <div className='p-4'>
                <div className='flex justify-between items-start'>
                  <h3 className='text-lg font-semibold'>{hotel.name}</h3>
                  <div className='flex items-center'>
                    <Star className='w-5 h-5 text-yellow-400 fill-current' />
                    <span className='ml-1 text-sm text-gray-600'>{hotel.rating}</span>
                  </div>
                </div>
                <p className='text-sm text-gray-500 mt-2'>{hotel.location}</p>
                <div className='mt-4'>
                  <div className='flex items-center text-sm text-gray-500'>
                    <Users className='w-4 h-4 mr-2' />
                    <span>{hotel.guests} guests</span>
                  </div>
                  <div className='mt-4 flex justify-between items-end'>
                    <div>
                      <p className='text-sm text-gray-500'>per night</p>
                      <p className='text-2xl font-bold text-blue-600'>${hotel.price}</p>
                    </div>
                    <button
                      onClick={() => onContinue(hotel.id)}
                      className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    >
                      Select Room
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
