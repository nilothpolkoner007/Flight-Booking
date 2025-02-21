import React, { useState, useEffect } from 'react';
import { Plane, Search, Clock } from 'lucide-react';

interface Flight {
  _id: string;
  airline: string;
  flightNumber: string;
  departureTime: string;
  departureCity: string;
  arrivalTime: string;
  arrivalCity: string;
  duration: string;
  price: number;
  logo: string;
}

interface FlightSelectionProps {
  onContinue: () => void;
}

export function FlightSelection({ onContinue }: FlightSelectionProps) {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/flights');
        if (!response.ok) throw new Error('Failed to fetch flights');
        const data = await response.json();
        setFlights(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div className='max-w-5xl mx-auto p-6'>
      {/* Search Bar */}
      <div className='bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Find Your Flight</h2>
        <div className='grid grid-cols-5 gap-4'>
          <div className='col-span-2'>
            <label className='block text-sm font-medium text-gray-700'>From</label>
            <div className='mt-1 relative rounded-md'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Plane className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='text'
                className='focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-2 border-gray-300 rounded-md shadow-sm'
                placeholder='Origin city'
              />
            </div>
          </div>
          <div className='col-span-2'>
            <label className='block text-sm font-medium text-gray-700'>To</label>
            <div className='mt-1 relative rounded-md'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Plane className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='text'
                className='focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-2 border-gray-300 rounded-md shadow-sm'
                placeholder='Destination city'
              />
            </div>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Search</label>
            <button className='mt-1 w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 flex items-center justify-center transition'>
              <Search className='h-5 w-5 mr-2' />
              Search Flights
            </button>
          </div>
        </div>
      </div>

      {/* Flight Results */}
      <div className='bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden'>
        <div className='px-6 py-4 bg-blue-100 border-b'>
          <h3 className='text-lg font-semibold text-gray-800'>Available Flights</h3>
        </div>
        <div className='p-6'>
          {loading ? (
            <p className='text-center text-gray-500 animate-pulse'>Loading flights...</p>
          ) : error ? (
            <p className='text-center text-red-500'>{error}</p>
          ) : flights.length === 0 ? (
            <p className='text-center text-gray-500'>No flights available</p>
          ) : (
            flights.map((flight) => (
              <div
                key={flight._id}
                className='border rounded-xl p-6 flex items-center justify-between hover:shadow-xl transition-shadow bg-white mb-4 shadow-md'
              >
                <div className='flex items-center gap-6'>
                  <img
                    src={flight.logo}
                    alt={`${flight.airline} logo`}
                    className='w-14 h-14 rounded-full object-cover shadow-md'
                  />
                  <div>
                    <h4 className='font-semibold text-lg text-gray-800'>{flight.airline}</h4>
                    <p className='text-sm text-gray-500'>{flight.flightNumber}</p>
                  </div>
                </div>
                <div className='text-center'>
                  <p className='text-lg font-semibold text-gray-900'>{flight.departureTime}</p>
                  <p className='text-sm text-gray-500'>{flight.departureCity}</p>
                </div>
                <div className='text-center flex flex-col items-center'>
                  <Clock className='w-6 h-6 text-blue-500' />
                  <p className='text-sm text-gray-500'>{flight.duration}</p>
                </div>
                <div className='text-center'>
                  <p className='text-lg font-semibold text-gray-900'>{flight.arrivalTime}</p>
                  <p className='text-sm text-gray-500'>{flight.arrivalCity}</p>
                </div>
                <div className='text-right'>
                  <p className='text-2xl font-bold text-blue-600'>${flight.price}</p>
                  <button
                    onClick={onContinue}
                    className='mt-2 w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition transform hover:scale-105'
                  >
                    Select
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
