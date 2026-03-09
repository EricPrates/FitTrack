'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '../api/contexts/Auth'
import { supabase } from '@/lib/server/supabase';
import type { Workout } from '@/app/types/types';
import { useWorkout } from '@/lib/hooks/useWorkout';
import { tryCatchErrorResult } from '@/lib/errors/error';
import { daysOfWeek } from '@/app/types/types';
import { Dumbbell, Calendar, Clock, ChevronRight, Activity, Target, Flame, ChessKnight } from 'lucide-react';
import GetDayWorkoutBtn from '@/components/GetDayWorkoutBtn';

export default function WorkoutsPage() {
    const { user } = useAuth();
    const { getAllWorkouts } = useWorkout();
    const [allWorkouts, setAllWorkouts] = useState<Workout[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWorkouts = async () => {
            setIsLoading(true);
            const result = await tryCatchErrorResult(getAllWorkouts);
            if (result.success) {
                setAllWorkouts(result.data || []);
            } else {
                console.error(result.error);
            }
            setIsLoading(false);
        }
        fetchWorkouts();
    }, [user]);

   


    // Estatísticas
    const totalWorkouts = allWorkouts.length;
    const uniqueDays = new Set(allWorkouts.map(w => w.dateworkout)).size;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
            {/* Header com gradiente */}
            <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-orange-500 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Meus Treinos</h1>
                            <p className="text-purple-100 text-lg">
                                Olá, {user?.email?.split('@')[0] || 'usuário'}! Continue evoluindo! 💪
                            </p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-4">
                            <Dumbbell className="w-12 h-12" />
                        </div>
                    </div>

                    {/* Cards de estatísticas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                            <p className="text-purple-100 text-sm">Total de Treinos</p>
                            <p className="text-3xl font-bold">{totalWorkouts}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                            <p className="text-purple-100 text-sm">Dias Diferentes</p>
                            <p className="text-3xl font-bold">{uniqueDays}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                            <p className="text-purple-100 text-sm">Média Semanal</p>
                            <p className="text-3xl font-bold">{(totalWorkouts / 7).toFixed(1)}/dia</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Conteúdo principal */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Estado de loading */}
                {isLoading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    </div>
                )}

                {/* Lista de treinos */}
                {!isLoading && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                            {allWorkouts.length === 0 ? 'Nenhum treino encontrado' : 'Seus treinos programados'}
                        </h2>

                        {allWorkouts.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                                <Dumbbell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">Você ainda não tem treinos cadastrados.</p>
                                <p className="text-gray-400">Comece adicionando seu primeiro treino!</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {allWorkouts.map((workout, index) => {
                                    
                                    return (
                                       <GetDayWorkoutBtn className='rounded-lg shadow-xl hover:shadow-2xl transition-all' key={index} index={index} workout={workout || 0} onClick={() => (workout)} />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}