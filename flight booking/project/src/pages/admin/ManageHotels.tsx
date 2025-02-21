import { useEffect, useState, FC, ChangeEvent, FormEvent } from 'react';
import Sidebar from './Sidebar';


interface Hotel {
  _id: string;
  name: string;
  location: string;
}

interface NewHotel {
  name: string;
  location: string;
  roomType: string;
  price: string;
  availableRooms: string;
}

export const ManageHotels: FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [newHotel, setNewHotel] = useState<NewHotel>({
    name: '',
    location: '',
    roomType: '',
    price: '',
    availableRooms: '',
  });

  useEffect(() => {
    fetch('/api/hotels')
      .then((res) => res.json())
      .then((data) => setHotels(data));
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewHotel({ ...newHotel, [e.target.name]: e.target.value });
  };

  const addHotel = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const response = await fetch('/api/hotels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newHotel),
    });

    if (response.ok) {
      const addedHotel = await response.json();
      setHotels([...hotels, addedHotel]);
      setNewHotel({ name: '', location: '', roomType: '', price: '', availableRooms: '' });
    }
  };

  const deleteHotel = async (id: string): Promise<void> => {
    await fetch(`/api/hotels/${id}`, { method: 'DELETE' });
    setHotels(hotels.filter((hotel) => hotel._id !== id));
  };

  return (
    <div className='flex'>
      <Sidebar onLogout={function (): void {
        throw new Error('Function not implemented.');
      } } />
      <div className='flex-1 p-6'>
        <h1 className='text-2xl font-bold mb-4'>Manage Hotels</h1>

        <form className='bg-white p-4 shadow-md rounded mb-6' onSubmit={addHotel}>
          <h2 className='text-xl font-semibold mb-2'>Add New Hotel</h2>
          <div className='grid grid-cols-3 gap-4'>
            <input
              name='name'
              value={newHotel.name}
              onChange={handleInputChange}
              placeholder='Hotel Name'
              className='border p-2'
              required
            />
            <input
              name='location'
              value={newHotel.location}
              onChange={handleInputChange}
              placeholder='Location'
              className='border p-2'
              required
            />
            <input
              name='roomType'
              value={newHotel.roomType}
              onChange={handleInputChange}
              placeholder='Room Type'
              className='border p-2'
              required
            />
            <input
              name='price'
              value={newHotel.price}
              onChange={handleInputChange}
              placeholder='Price'
              type='number'
              className='border p-2'
              required
            />
            <input
              name='availableRooms'
              value={newHotel.availableRooms}
              onChange={handleInputChange}
              placeholder='Available Rooms'
              type='number'
               className='border p-2'
               required
             />
           </div>
           <button type='submit' className='mt-4 bg-blue-600 text-white px-4 py-2 rounded'>
             Add Hotel
           </button>
         </form>

         <table className='w-full bg-white shadow-md rounded'>
           <thead>
             <tr>
               <th className='p-4 border-b'>Name</th>
               <th className='p-4 border-b'>Location</th>
               <th className='p-4 border-b'>Actions</th>
             </tr>
           </thead>
           <tbody>
             {hotels.map((hotel) => (
               <tr key={hotel._id}>
                 <td className='p-4 border-b'>{hotel.name}</td>
                 <td className='p-4 border-b'>{hotel.location}</td>
                 <td className='p-4 border-b'>
                   <button onClick={() => deleteHotel(hotel._id)} className="text-red-500">
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
};
export default ManageHotels;