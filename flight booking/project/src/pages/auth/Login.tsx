import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import AuthContext from '../../AuthContext';

interface FormData {
  email: string;
  password: string;
}

export function Login() {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }
  const { login } = authContext;
 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }

    try {
      await login({ email: formData.email, password: formData.password });
     
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow'>
        <h2 className='text-center text-3xl font-extrabold text-gray-900'>
          Sign in to your account
        </h2>
        <p className='text-center text-sm text-gray-600'>
          Or{' '}
          <a href='/signup' className='font-medium text-blue-600 hover:text-blue-500'>
            create a new account
          </a>
        </p>

        {error && <p className='text-red-500 text-sm text-center'>{error}</p>}

        <form className='space-y-6' onSubmit={handleSubmit}>
          <div className='space-y-4'>
            <div className='relative'>
              <Mail className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
              <input
                name='email'
                type='email'
                placeholder='Email address'
                required
                className='w-full px-10 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className='relative'>
              <Lock className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
              <input
                name='password'
                type='password'
                placeholder='Password'
                required
                className='w-full px-10 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='flex items-center justify-between text-sm'>
            <label className='flex items-center'>
              <input type='checkbox' className='mr-2' />
              Remember me
            </label>
            <a href='#' className='text-blue-600 hover:text-blue-500'>
              Forgot your password?
            </a>
          </div>

          <Button
            type='submit'
            className='w-full flex justify-center py-2 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700'
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
            <ArrowRight className='ml-2 h-4 w-4' />
          </Button>
        </form>
      </div>
    </div>
  );
}
