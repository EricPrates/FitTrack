import { useAuth } from "@/app/api/contexts/Auth";
import { tryCatchError } from "../errors/error";
import { supabase } from "../server/supabase";
import { useState } from "react";
import { Exercise, Workout } from "@/app/types/types";
import { useExercises } from "./useExercises";
import { useWorkoutExercises } from "./useWorkoutExercises";

export const useWorkout = () => {


  const [error, setError] = useState<string | null>(null);
  
  const { addExercisesToWorkout } = useWorkoutExercises();
  const [workout, setWorkout] = useState<Workout>({
    id:'',
    name: '',
    description: '',
    dateworkout: 0,
    user_id: '',
    created_at: new Date()
  });
  const { user, startLoading, stopLoading } = useAuth();




  //leitura e escrita em banco
  const getAllWorkouts = async () => {
    startLoading();
    const { data, error } = await supabase
      .from('workout')
      .select('*')
      .order('created_at', { ascending: false });

    stopLoading();
    if (error) {
      throw new Error('Erro ao buscar treinos: ' + error.message);
    }
    return data || [];
  };

  const deleteWorkout = async (workoutId: string) => {
    startLoading();
    try {
      const { error } = await supabase
        .from('workouts')
        .delete()
        .eq('id', workoutId)
        .eq('user_id', user?.id);
      if (error) {
        throw new Error('Erro ao deletar treino: ' + error.message);
      }
    } finally {
      stopLoading();
    }
  };

  const addWorkout = async (workoutData: Workout, exercisesData: Exercise[]) => {

    startLoading();
    if (!workoutData.name || !workoutData.dateworkout) {
      throw new Error('Dados do treino incompletos');
    }
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    const { data: workout, error: WorkoutError } = await supabase
      .from('workout')
      .insert([{ ...workoutData, user_id: user.id, created_at: new Date() }])
      .select()
      .single();

    if (WorkoutError) {
      stopLoading();
      throw new Error('Erro ao criar treino: Chegou aqui' + WorkoutError.message);

    }

    
    stopLoading();

    return {
      workout,
    
    };

  }


  return {
    addWorkout,
    workout,
    setWorkout,
    getAllWorkouts,
  }
}