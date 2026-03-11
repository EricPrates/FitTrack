import { useAuth } from "@/app/api/contexts/Auth";
import { tryCatchError } from "../errors/error";
import { supabase } from "../server/supabase";
import { useState } from "react";
import { Exercise, Workout } from "@/app/types/types";
import { useExercises } from "./useExercises";
import { useWorkoutExercises } from "./useWorkoutExercises";
import { error } from "console";
import { get } from "http";
import { start } from 'repl';


export const useWorkout = () => {


  const [error, setError] = useState<string | null>(null);

  const { addExercisesToWorkout } = useWorkoutExercises();
  const [workout, setWorkout] = useState<Workout>({

    name: '',
    description: '',
    dateworkout: 1,
    user_id: '',
    created_at: new Date()
  });
  const { user, startLoading, stopLoading } = useAuth();

  // função auxilixar de erro no fetch para lidar com falhas de rede



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
        .from('workout')
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
  
  //buscar treinos da semana para o dashboard
  const getWeeklyWorkouts = async () => {
    const weeklyWorkouts: Workout[] | any = [];
    startLoading();

    for (let i = 1; i <= 7; i++) {
      const { data, error } = await supabase
        .from('workout')
        .select('*')
        .order('created_at', { ascending: false })
        .eq('user_id', user?.id)
        .eq('dateworkout', i)
        .limit(1);
        

      if (data != null) {
        weeklyWorkouts.push(...data);
      }
      if (error) {
        console.error('Erro ao buscar treinos da semana para o dia ' + i + ': ' + error.message);
        throw new Error('Erro ao buscar treinos da semana para o dia ' + i + ': ' + error.message);
      }
    }

    stopLoading();

    return weeklyWorkouts;
  }

  const addWorkout = async (workoutData: Workout, exercisesData: Exercise[]) => {

    startLoading();

    console.log('📋 Exercícios a adicionar:', exercisesData.length);
    console.log('📋 IDs dos exercícios:', exercisesData.map(e => e.id));

    try {
      // Validações
      if (!workoutData.dateworkout) {
        throw new Error('Sem dia selecionado para o treino');
      }
      if (!workoutData.name) {
        throw new Error('Sem nome para o treino');
      }
      if (!user) {
        throw new Error('Usuário não autenticado');
      }
      if (!exercisesData || exercisesData.length === 0) {
        throw new Error('Adicione pelo menos um exercício ao treino');
      }

      // Preparar dados
      const workoutToInsert = {
        name: workoutData.name,
        user_id: user.id,
        description: workoutData.description || null,
        dateworkout: workoutData.dateworkout,
        created_at: new Date().toISOString()
      };

      console.log('⏳ Iniciando insert...');
      console.log('📡 Cliente Supabase:', supabase);

      const { error: WorkoutError } = await supabase
        .from('workout')
        .insert(workoutToInsert)
        .select()
        .single();

      console.log(' Insert concluído');

      //buscar treino criado para pegar o id
      const { data: workout, error: fetchError } = await supabase
        .from('workout')
        .select('*')
        .eq('user_id', user.id)
        .eq('name', workoutToInsert.name)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();


      if (fetchError) {
        console.error('❌ Erro ao buscar treino criado:', fetchError);
        throw new Error('Treino criado, mas erro ao buscar o treino para adicionar exercícios: ' + fetchError.message);
      }
      console.log(`Trein encontrado ${workout}`);


      // Adicionar exercícios ao treino
      if (exercisesData && exercisesData.length > 0) {

        const exercisesResult = await addExercisesToWorkout(exercisesData, workout.id);

        if (!exercisesResult.success) {
          console.error(' Erro ao adicionar exercícios:', exercisesResult.error);
          throw new Error(`Treino criado, mas erro ao adicionar exercícios: ${exercisesResult.error}`);
        }

        console.log(' Exercícios adicionados com sucesso:', exercisesResult.count);
      }

      return { workout };

    } catch (error) {
      console.error('❌ Erro capturado:', error);
      throw error; // Relança para o componente tratar
    } finally {

      stopLoading();
    }
  };

  return {
    addWorkout,
    workout,
    setWorkout,
    getAllWorkouts,
    getWeeklyWorkouts,
    deleteWorkout
  }
}