import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Plane, Hotel, MapPin, LayoutDashboard, LogIn, UserPlus, LogOut } from 'lucide-react';
import { FlightSelection } from './pages/FlightSelection';
import { HotelSelection } from './pages/HotelSelection';
import { ActivitiesSelection } from './pages/ActivitiesSelection';
import { SummaryPage } from './pages/SummaryPage';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { ManageFlights } from './pages/admin/ManageFlights';
import { ManageHotels } from './pages/admin/ManageHotels';
import { ManageUsers } from './pages/admin/ManageUser';
import Dashboard from './pages/admin/Dashboard';
import { AuthProvider, useAuth } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='min-h-screen bg-gray-50'>
          {/* Navigation */}
          <NavBar />

          {/* Routes */}
          <main>
            <Routes>
              <Route path='/flights' element={<FlightSelection onContinue={() => {}} />} />
              <Route path='/hotels' element={<HotelSelection onContinue={() => {}} />} />
              <Route path='/activities' element={<ActivitiesSelection onContinue={() => {}} />} />
              <Route path='/summary' element={<SummaryPage />} />

              {/* Admin Routes */}
              <Route
                path='/admin'
                element={
                  <ProtectedRoute role='admin'>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/admin/flights'
                element={
                  <ProtectedRoute role='admin'>
                    <ManageFlights />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/admin/hotels'
                element={
                  <ProtectedRoute role='admin'>
                    <ManageHotels />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/admin/users'
                element={
                  <ProtectedRoute role='admin'>
                    <ManageUsers />
                  </ProtectedRoute>
                }
              />

              {/* Auth Routes */}
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/' element={<FlightSelection onContinue={() => {}} />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

// 🔹 Navigation Bar Component
function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className='bg-white shadow'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex'>
            <div className='flex-shrink-0 flex items-center'>
              <Link to='/' className='text-xl font-bold text-blue-600'>
                TravelApp
              </Link>
            </div>
            <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
              <NavItem to='/flights' icon={<Plane />} label='Flights' />
              <NavItem to='/hotels' icon={<Hotel />} label='Hotels' />
              <NavItem to='/activities' icon={<MapPin />} label='Activities' />
              <NavItem to='/summary' icon={<LayoutDashboard />} label='Summary' />
            </div>
          </div>
          <div className='hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4'>
            {user ? (
              <button
                onClick={logout}
                className='inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700'
              >
                <LogOut className='w-4 h-4 mr-2' /> Logout
              </button>
            ) : (
              <>
                <NavItem to='/login' icon={<LogIn />} label='Login' />
                <NavItem to='/signup' icon={<UserPlus />} label='Sign Up' />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// 🔹 Navigation Item Component
function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link to={to} className='text-gray-500 hover:text-gray-700 flex items-center px-3 py-2'>
      {icon} <span className='ml-2'>{label}</span>
    </Link>
  );
}

// 🔹 Protected Route Component
function ProtectedRoute({ children, role }: { children: React.ReactNode; role?: string }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/login' />;
  }

  if (role && user.role !== role) {
    return <Navigate to='/' />;
  }

  return children;
}

export default App;
