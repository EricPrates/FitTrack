import { useAuth } from "@/app/api/contexts/Auth";
import { tryCatchError } from "../errors/error";
import { supabase } from "../server/supabase";
import { useState } from "react";
import { Exercise } from "@/app/types/types";
export const useWorkout = () => {

  const [workout, setWorkout] = useState(
        {
            name: '',
            description: '',
            dateWorkout: 0,
            user_id: '',
            created_at: new Date()
        });
  const { user, startLoading, stopLoading } = useAuth();

  const addWorkout = async (workoutData: any) => {
    startLoading();
    if (!workoutData.name ||  !workoutData.dateWorkout) {
      throw new Error('Dados do treino incompletos');
    }
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    
    const { data, error } = await supabase
      .from('workouts')
      .insert([{ ...workoutData, user_id: user.id }])
      .select()
      .single();
    stopLoading();
    if (error) {
      console.error('Erro ao adicionar treino:', error.message);
      throw error;
    }
    return data;
  };


  return {
      addWorkout,
      workout,
      setWorkout
  }
}