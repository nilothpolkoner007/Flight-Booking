import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export function ManageUsers(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const deleteUser = async (id: string): Promise<void> => {
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    setUsers(users.filter((user) => user._id !== id));
  };

  return (
    <div className='flex'>
      <Sidebar onLogout={function (): void {
        throw new Error('Function not implemented.');
      } } />
      <div className='flex-1 p-6'>
        <h1 className='text-2xl font-bold mb-4'>Manage Users</h1>

        <table className='w-full bg-white shadow-md rounded'>
          <thead>
            <tr>
              <th className='p-4 border-b'>Name</th>
              <th className='p-4 border-b'>Email</th>
              <th className='p-4 border-b'>Role</th>
              <th className='p-4 border-b'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className='p-4 border-b'>{user.name}</td>
                <td className='p-4 border-b'>{user.email}</td>
                <td className='p-4 border-b'>{user.role}</td>
                <td className='p-4 border-b'>
                  <button onClick={() => deleteUser(user._id)} className='text-red-500'>
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
export default ManageUsers;