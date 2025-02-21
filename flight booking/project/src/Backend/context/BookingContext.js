import { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [booking, setBooking] = useState({
    flight: null,
    hotel: null,
    activities: [],
    totalPrice: 0,
  });

  const addFlight = (flight) => setBooking((prev) => ({ ...prev, flight }));
  const addHotel = (hotel) => setBooking((prev) => ({ ...prev, hotel }));
  const addActivities = (activities) => setBooking((prev) => ({ ...prev, activities }));
  const setTotalPrice = (price) => setBooking((prev) => ({ ...prev, totalPrice: price }));

  return (
    <BookingContext.Provider value={{ booking, addFlight, addHotel, addActivities, setTotalPrice }}>
      {children}
    </BookingContext.Provider>
  );
};
