'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '../api/contexts/Auth'
import { supabase } from '@/lib/server/supabase';
import type { Workout } from '@/app/types/types';
import { getAllWorkouts } from '@/lib/server/supabase';
import { tryCatchErrorResult } from '@/lib/errors/error';
export default function WorkoutsPage() {

    const {user} = useAuth();
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
            <h1 className="text-2xl font-bold mb-4">Workouts Page</h1>
            <p>This is the all workouts page from {user?.email}.</p>
        </div>
    )
}