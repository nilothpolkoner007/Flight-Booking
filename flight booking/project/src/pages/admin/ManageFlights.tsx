import { useEffect, useState, FC, ChangeEvent, FormEvent } from 'react';
import Sidebar from './Sidebar';

interface Flight {
  _id: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
}

interface NewFlight {
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price: number | '';
  availableSeats: number | '';
}

export const ManageFlights: FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [newFlight, setNewFlight] = useState<NewFlight>({
    airline: '',
    origin: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    price: '',
    availableSeats: '',
  });

  useEffect(() => {
    fetch('/api/flights')
      .then((res) => res.json())
      .then((data) => setFlights(data));
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setNewFlight({ ...newFlight, [name]: value });
  };

  const addFlight = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const response = await fetch('/api/flights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFlight),
    });

    if (response.ok) {
      const addedFlight = await response.json();
      setFlights([...flights, addedFlight]);
      setNewFlight({
        airline: '',
        origin: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        price:'',
        availableSeats:'',
      });
    }
  };

  const deleteFlight = async (id:string): Promise<void> => {
    await fetch(`/api/flights/${id}`, { method:'DELETE' });
    setFlights(flights.filter((flight) => flight._id !== id));
   };

   return (
     <div className='flex'>
       <Sidebar onLogout={function (): void {
         throw new Error('Function not implemented.');
       } } />
       <div className='flex-1 p-6'>
         <h1 className='text-2xl font-bold mb-4'>Manage Flights</h1>

         {/* Add Flight Form */}
         <form className='bg-white p-4 shadow-md rounded mb-6' onSubmit={addFlight}>
           <h2 className='text-xl font-semibold mb-2'>Add New Flight</h2>
           <div className='grid grid-cols-3 gap-4'>
             <input
               name='airline'
               value={newFlight.airline}
               onChange={handleInputChange}
               placeholder='Airline'
               className='border p-2'
               required
             />
             <input
               name='origin'
               value={newFlight.origin}
               onChange={handleInputChange}
               placeholder='Origin'
               className='border p-2'
               required
             />
             <input
               name='destination'
               value={newFlight.destination}
               onChange={handleInputChange}
               placeholder='Destination'
               className='border p-2'
               required
             />
             <input
              name='departureTime'
              value={newFlight.departureTime}
              onChange={handleInputChange}
              placeholder='Departure Time'
              type='datetime-local'
              className='border p-2'
              required
            />
            <input
              name='arrivalTime'
              value={newFlight.arrivalTime}
              onChange={handleInputChange}
              placeholder='Arrival Time'
              type='datetime-local'
              className='border p-2'
              required
            />
            <input
              name='price'
              value={newFlight.price}
              onChange={handleInputChange}
              placeholder='Price'
              type="number"
              className="border p-2"
              required
            />
            <input
                name="availableSeats"
                value={newFlight.availableSeats}
                onChange={handleInputChange}
                placeholder="Available Seats"
                type="number"
                className="border p-2"
                required
            />
          </div>
          <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
            Add Flight
          </button>
        </form>

        {/* Flight List */}
        <table className="w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="p-4 border-b">Airline</th>
              <th className="p-4 border-b">Origin</th>
              <th className="p-4 border-b">Destination</th>
              <th className="p-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
                <tr key={flight._id}>
                  <td className="p-4 border-b">{flight.airline}</td>
                  <td className="p-4 border-b">{flight.origin}</td>
                  <td className="p-4 border-b">{flight.destination}</td>
                  <td className="p-4 border-b">
                    <button onClick={() => deleteFlight(flight._id)} 
                      className="text-red-500">
                      Delete
                    </button>
                   </td>
                 </tr>
             ))}
           </tbody>
         </table>
       </div>
     </div> 
   );
}
export default ManageFlights;