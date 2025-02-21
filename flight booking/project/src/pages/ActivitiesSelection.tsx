import React, { useState, useEffect } from 'react';

interface Activity {
  id: string;
  name: string;
  duration: string;
  price: number;
  image: string;
}

interface ActivitiesSelectionProps {
  onContinue: () => void;
}

export function ActivitiesSelection({ onContinue }: ActivitiesSelectionProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/activities');
        if (!response.ok) throw new Error('Failed to fetch activities');
        const data = await response.json();
        setActivities(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className='max-w-5xl mx-auto p-6'>
      {/* Section Header */}
      <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-200'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>Popular Activities in London</h2>

        {/* Activities Grid */}
        {loading ? (
          <p className='text-center text-gray-500 animate-pulse'>Loading activities...</p>
        ) : error ? (
          <p className='text-center text-red-500'>{error}</p>
        ) : activities.length === 0 ? (
          <p className='text-center text-gray-500'>No activities available</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {activities.map((activity) => (
              <div
                key={activity.id}
                className='border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white'
              >
                <img
                  src={activity.image}
                  alt={activity.name}
                  className='w-full h-52 object-cover'
                />
                <div className='p-5'>
                  <h3 className='text-lg font-semibold text-gray-800'>{activity.name}</h3>
                  <p className='text-sm text-gray-500 mt-1'>Duration: {activity.duration}</p>
                  <div className='mt-4 flex justify-between items-center'>
                    <p className='text-xl font-bold text-blue-600'>${activity.price}</p>
                    <button
                      onClick={onContinue}
                      className='bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition transform hover:scale-105'
                    >
                      Add Activity
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
