
export interface Workout {

  name: string | undefined
  description: string | undefined
  dateworkout: number | undefined
  exercises?: Exercise[] | undefined
  user_id: string | undefined
  created_at: Date | undefined

}
export interface Workout_logs extends Workout {
  id: string | undefined
  workout_id: string | undefined
  duration_minutes: number | undefined
}
export const daysOfWeek: { key: string, value: number }[] = [
  { key: 'Segunda-feira', value: 1 },
  { key: 'Terça-feira', value: 2 },
  { key: 'Quarta-feira', value: 3 },
  { key: 'Quinta-feira', value: 4 },
  { key: 'Sexta-feira', value: 5 },
  { key: 'Sábado', value: 6 },
  { key: 'Domingo', value: 7 },
];

 // Função para determinar cor baseada no dia da semana
    export const getDayColor = (dayIndex: number) => {
        const colors = {
            0: 'from-red-500 to-orange-500', // Domingo
            1: 'from-blue-500 to-cyan-500',   // Segunda
            2: 'from-green-500 to-emerald-500', // Terça
            3: 'from-purple-500 to-pink-500',  // Quarta
            4: 'from-yellow-500 to-amber-500', // Quinta
            5: 'from-indigo-500 to-purple-500', // Sexta
            6: 'from-pink-500 to-rose-500',    // Sábado
        };
        return colors[dayIndex as keyof typeof colors] || 'from-gray-500 to-gray-600';
    };
export const bodyParts: { key: string, value: string }[] = [{ key: 'peito', value: 'chest' }, { key: 'costas', value: 'back' }, { key: 'pernas', value: 'upper legs' }, { key: 'braços', value: 'upper arms' }, { key: 'ombros', value: 'shoulders' },
{ key: 'abdômen', value: 'waist' }, { key: 'cardio', value: 'cardio' }, { key: 'antebraço', value: 'lower arms' }, { key: 'panturrilha', value: 'lower legs' }
];

export type ResultPattern<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

export interface User {
  id: string
  email: string
  name: string
  created_at: Date
  userDbID: string | undefined
}
export interface Exercise {
  id: string | undefined,
  name: string | undefined,
  gifurl: string | undefined,
  targetmuscles: string[] | undefined,
  bodyparts: string[] | undefined,
  equipments: string[] | undefined,
  secondarymuscles: string[] | undefined,
  instructions: string | undefined,
  reps: number | undefined,
  sets: number | undefined,
  restSeconds: number | undefined,
  notes: string | undefined,
  orderIndex: number | undefined,
  weight: number | undefined
}

export interface WorkoutExercise {
  workoutId: string
  exerciseId: string
  sets: number
  reps: number
  restSeconds: number
  notes: string | null
  orderIndex: number| undefined
  weight: number | undefined
  created_at: Date
  
}