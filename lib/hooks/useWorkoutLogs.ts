import { useState, useEffect } from 'react';
import { Workout_logs } from '@/app/types/types';
import { useAuth } from '../../app/api/contexts/Auth';
import { supabase } from '../server/supabase';
export default function useWorkoutLogs() {
  const [workoutLogs, setWorkoutLogs] = useState<Workout_logs[]>([]);
  const { startLoading, stopLoading } = useAuth();

  //buscar se o treino do dia foi concluido

  const dayWorkoutCompleted = async (dateworkout: number) => {
    startLoading();
    const { data, error } = await supabase
      .from('workout_logs')
      .select('*')
      .eq('dateworkout', dateworkout)
      .order('created_at', { ascending: false })
      .limit(1);
    stopLoading();
    return { data, error };
  };
}