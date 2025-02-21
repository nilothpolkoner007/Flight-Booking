import React, { useState } from 'react';
import axios from 'axios';
import { FaCreditCard } from 'react-icons/fa';

export function SummaryPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [booking, setBooking] = useState(null);

  // Dynamic selections
  const [selectedFlight] = useState('EK-302');
  const [selectedHotel] = useState('Grand Plaza Hotel');
  const [selectedActivities, setSelectedActivities] = useState(['London Eye Experience']);

  // Prices (mock data)
  const prices = {
    flights: { 'EK-302': 749 },
    hotels: { 'Grand Plaza Hotel': 897 },
    activities: { 'London Eye Experience': 39 },
  };

  // Calculate total price
  const totalPrice =
    prices.flights[selectedFlight] +
    prices.hotels[selectedHotel] +
    selectedActivities.reduce((acc, act) => acc + (prices.activities[act] || 0), 0);

  // Handle payment & booking
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/bookings/create', {
        flightId: selectedFlight, // Fixed key
        hotelId: selectedHotel, // Fixed key
        activityIds: selectedActivities, // Fixed key
        totalPrice,
      });

      setBooking(response.data.booking);
      alert('Booking successful!');
    } catch (error) {
      alert('Booking failed! Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8'>
      {/* Left Section */}
      <div className='md:col-span-2 space-y-6'>
        {/* Booking Summary */}
        <div className='bg-white rounded-lg shadow-md p-6 border border-gray-200'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Booking Summary</h2>
          <div className='border-b pb-4 mb-4'>
            <div className='flex justify-between items-center'>
              <div>
                <h3 className='font-medium text-gray-700'>Flight</h3>
                <p className='text-sm text-gray-500'>{selectedFlight}</p>
              </div>
              <p className='text-lg font-semibold text-blue-600'>
                ${prices.flights[selectedFlight]}
              </p>
            </div>
          </div>
          <div className='border-b pb-4 mb-4'>
            <div className='flex justify-between items-center'>
              <div>
                <h3 className='font-medium text-gray-700'>Hotel</h3>
                <p className='text-sm text-gray-500'>{selectedHotel}</p>
              </div>
              <p className='text-lg font-semibold text-blue-600'>${prices.hotels[selectedHotel]}</p>
            </div>
          </div>
          <div>
            <div className='flex justify-between items-center'>
              <div>
                <h3 className='font-medium text-gray-700'>Activities</h3>
                {selectedActivities.map((activity) => (
                  <p key={activity} className='text-sm text-gray-500'>
                    {activity}
                  </p>
                ))}
              </div>
              <p className='text-lg font-semibold text-blue-600'>
                ${selectedActivities.reduce((acc, act) => acc + prices.activities[act], 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className='bg-white rounded-lg shadow-md p-6 border border-gray-200'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Payment Details</h2>
          <form className='space-y-4' onSubmit={handlePayment}>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Card Number</label>
              <div className='relative mt-1'>
                <input
                  type='text'
                  className='block w-full border-gray-300 rounded-md shadow-sm pl-10 focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                  placeholder='1234 5678 9012 3456'
                />
                <FaCreditCard className='absolute top-3 left-3 text-gray-400' />
              </div>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <div className='col-span-2'>
                <label className='block text-sm font-medium text-gray-700'>Expiry Date</label>
                <input
                  type='text'
                  className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                  placeholder='MM/YY'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700'>CVV</label>
                <input
                  type='text'
                  className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                  placeholder='123'
                />
              </div>
            </div>
            <button
              type='submit'
              className={`w-full flex items-center justify-center py-3 px-4 text-white rounded-md bg-blue-600 hover:bg-blue-700 transition transform hover:scale-105 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : `Pay $${totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
