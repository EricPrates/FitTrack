import { Exercise } from '@/app/types/types';
import { supabase } from '../server/supabase';
import { useAuth } from '../../app/api/contexts/Auth';
import { Weight } from 'lucide-react';
import { useExercises } from './useExercises';
export const useWorkoutExercises = () => {
    const { startLoading, stopLoading, user } = useAuth();
   
    const addExercisesToWorkout = async (exerciseData: Exercise[], workoutId: string) => {
    const results = await Promise.all(exerciseData.map(async (exercise) => {
        console.log(`Adicionando exercício: ${exercise.id} ao treino ${workoutId}`);
        
        // Insert 
        const { error } = await supabase
            .from('workout_exercises')
            .insert({
                exercise_id: exercise.id,
                workout_id: workoutId,
                sets: exercise.sets || 0,
                reps: exercise.reps || 0,
                rest_seconds: exercise.restSeconds || 0,
                notes: exercise.notes || null,
                order_index: exercise.orderIndex || 0,
                weight: exercise.weight || 0
            });

        if (error) {
            console.log(' Erro ao inserir:', error.message);
            return {
                success: false,
                name: exercise.name || exercise.id,
                error: error.message
            };
        }

        console.log('✅ Exercício inserido');
        return { success: true, name: exercise.name };
    }));

    const failed = results.filter(r => !r.success);

    if (failed.length > 0) {
        return {
            success: false,
            error: `${failed.length} exercício(s) falharam`,
            failed: failed
        };
    }

    return {
        success: true,
        count: results.length
    };
};


    return { addExercisesToWorkout };
};