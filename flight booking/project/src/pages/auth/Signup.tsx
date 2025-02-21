import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export function Signup() {
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        mathod: 'POST',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,    
          password: formData.password,
          role,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
     

      const data = await response?.data;
      if (!data) {
        throw new Error('No data received from server');
      }

      console.log('Registration successful:', data);
      alert('Registration successful');
      return <Navigate to='/login' />;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Registration error:', error.response.data);
      } else {
        console.error('Registration error:', error);
      }
    }
    
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Create your account
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Already have an account?{' '}
            <a href='/login' className='font-medium text-blue-600 hover:text-blue-500'>
              Sign in
            </a>
          </p>
        </div>

        {/* Role Selection */}
        <div className='flex justify-center space-x-4'>
          <button
            onClick={() => setRole('user')}
            className={`px-4 py-2 rounded-md ${
              role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            User
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`px-4 py-2 rounded-md ${
              role === 'admin'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Admin
          </button>
        </div>

        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='rounded-md shadow-sm -space-y-px'>
            <div className='relative'>
              <label htmlFor='full-name' className='sr-only'>
                Full Name
              </label>
              <User className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
              <input
                id='full-name'
                name='name'
                type='text'
                required
                className='appearance-none rounded-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                placeholder='Full Name'
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className='relative'>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <Mail className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
              <input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='appearance-none rounded-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                placeholder='Email address'
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className='relative'>
              <label htmlFor='phone' className='sr-only'>
                Phone Number
              </label>
              <Phone className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
              <input
                id='phone'
                name='phone'
                type='tel'
                autoComplete='tel'
                required
                className='appearance-none rounded-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                placeholder='Phone Number'
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className='relative'>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <Lock className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='new-password'
                required
                className='appearance-none rounded-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className='relative'>
              <label htmlFor='confirm-password' className='sr-only'>
                Confirm Password
              </label>
              <Lock className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
              <input
                id='confirm-password'
                name='confirmPassword'
                type='password'
                autoComplete='new-password'
                required
                className='appearance-none rounded-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                placeholder='Confirm Password'
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <Button
              type='submit'
              onChange={handleSubmit}
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              Create Account
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
