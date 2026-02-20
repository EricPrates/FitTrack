
export interface Workout {
 
  name: string | undefined
  description: string | undefined
  dateWorkout: number | undefined
  exercises?: Exercise[] | undefined
  user_id: string | undefined
  created_at: Date | undefined

}

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
}
export interface Exercise {
  id: string | undefined,
  name: string | undefined,
  gifurl: string | undefined,
  targetmuscles: string[] | undefined,
  bodyparts: string[] | undefined,
  equipments: string[] | undefined,
  secondarymuscles: string[] | undefined,
  instructions: string | undefined
  
}

export interface WorkoutExercise {
  workoutId: string
  exerciseId: string
  sets: number
  reps: number
  restSeconds: number
  notes: string | null
}