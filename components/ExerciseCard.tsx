import { Exercise, Workout } from "@/app/types/types";
import { useWorkout } from "@/lib/hooks/useWorkout";
import { useExercises } from "@/lib/hooks/useExercises";
export default function ExerciseCard({ selectedExercises, setSelectedExercises }: { selectedExercises: Exercise[] | undefined, setSelectedExercises: (exercises: Exercise[]) => void }) {

    
    if (!selectedExercises || selectedExercises.length === 0) {
        return null;
    }
    return (
        
    selectedExercises.map((exercise, index) => (    

                        <div key={index} className="flex-1 flex flex-row mt-6 bg-white rounded-xl border border-gray-200 p-6">
                            <img src={ exercise.gifurl} alt={exercise.name? exercise.name : undefined} className="w-40 h-40 rounded-lg border border-gray-200 " />
                            <div className="ml-6 flex flex-col gap-3">
                                <h3 className="text-sm font-bold text-gray-700 mb-4">
                                    Exercício: {exercise.name}
                                </h3>
                                <p className="text-sm text-gray-500 mt-2">
                                    Músculos Alvo: {exercise?.targetmuscles?.join(', ')}
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Equipamento: {exercise?.equipments?.join(', ')}
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Parte do Corpo: {exercise?.bodyparts?.join(', ')}
                                </p>

                            </div>
                            <div className="ml-auto gap-4 flex flex-col items-center">
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium text-gray-700 items-left">
                                        Séries
                                    </label>
                                    <input
                                    onChange={(e) => {
                                        setSelectedExercises(selectedExercises.map((ex, i) => i === index ? { ...ex, sets: parseInt(e.target.value) || 0 } : ex))
                                    }}
                                        type="number"
                                        min={1}
                                        className="w-20 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none items-center"
                                    />
                                </div>
                                <div className="flex flex-col items-center">
                                    <label className="block text-sm font-medium text-gray-700 items-left">
                                        Repetições
                                    </label>
                                    <input
                                        type="number"
                                        min={1}
                                        className="w-20 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                                    />
                                </div>
                                <div className="flex flex-col items-center">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Descanso (s)
                                    </label>
                                    <input
                                        type="number"
                                        min={0}
                                        className="w-20 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                                    />
                                </div>
                                 <div className="flex flex-col items-center">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Ordem
                                    </label>
                                    <input
                                        type="number"
                                        min={0}
                                        className="w-20 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                                    />

                          
                                </div>
                            </div>
                        </div>
                    ))

                )
}