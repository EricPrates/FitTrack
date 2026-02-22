import { Exercise } from '@/app/types/types';
import { supabase } from '../server/supabase';
import { useAuth } from '../../app/api/contexts/Auth';
export const useWorkoutExercises = () => {
    const addExercisesToWorkout = async (exerciseData: Exercise[], workoutId: string) => {
        const results = await Promise.all(exerciseData.map(async (exercise) => {
            const { data, error } = await supabase
                .from('workout_exercises')
                .insert({
                    exercise_id: exercise.id,
                    workout_id: workoutId,
                    sets: exercise.sets || 0,
                    reps: exercise.reps || 0,
                    rest_seconds: exercise.restSeconds || 0,
                    notes: exercise.notes || null,
                    order_index: exercise.orderIndex || 0,
                    created_at: new Date()
                })
                .select()
                .single();

            if (error) {
                return {
                    success: false,
                    name: exercise.name || exercise.id,
                    error: error.message
                };
            }

            return { success: true, data };
        }));

        const failed = results.filter(r => !r.success);

        if (failed.length > 0) {
            return {
                success: false,
                error: `${failed.length} exercício(s) falharam`,
                failed: failed.map(f => ({ name: f.name, error: f.error })),
                succeeded: results.filter(r => r.success).map(r => r.data)
            };
        }

        return {
            success: true,
            data: results.map(r => r.data),
            count: results.length
        };
    };

    return { addExercisesToWorkout };
};