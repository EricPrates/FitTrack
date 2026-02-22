'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '../api/contexts/Auth'
import { supabase } from '@/lib/server/supabase';
import type { Workout } from '@/app/types/types';
import { useWorkout } from '@/lib/hooks/useWorkout';
import { tryCatchErrorResult } from '@/lib/errors/error';
export default function WorkoutsPage() {

    const {user} = useAuth();
    const { getAllWorkouts } = useWorkout();
    const [allWorkouts, setAllWorkouts] = useState<Workout[]>([]);

    useEffect(() => {
      const fetchWorkouts = async () => {
        const result = await tryCatchErrorResult(getAllWorkouts);
        if (result.success) {
          setAllWorkouts(result.data || []);
        } else {
          console.error(result.error);
        }
      }
      fetchWorkouts();
    }, [user]);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Página de treinos</h1>
            <p>Página com os treinos do usuário {user?.email}.</p>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Your Workouts:</h2>
              {allWorkouts.length === 0 ? (
                <p>No workouts found.</p>
              ) : (
                <ul className="list-disc pl-5">
                  {allWorkouts.map(workout => (
                    <li key={workout.name} className="mb-2">
                      <h3 className="text-lg font-medium">{workout.name}</h3>
                      <p>{workout.description}</p>
                      <p className="text-sm text-gray-500">Created at: {new Date(workout.created_at?.toString() || '').toLocaleDateString()}</p>

                    </li>
                  ))}
                </ul>
              )}
            </div>

        </div>
    )
}