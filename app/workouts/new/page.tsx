'use client';
import { useReducer, useState } from "react";
import { bodyParts } from '@/app/types/types'
import { supabase } from '../../../lib/server/supabase';
import { Search, Plus, X, ChevronDown, Dumbbell, Calendar, Clock, Save } from "lucide-react";
import SelectComponent from "@/components/selectComponent";
import { useExercises } from "@/lib/hooks/useExercises";
import { useAuth } from "@/app/api/contexts/Auth";
import { useWorkout } from "@/lib/hooks/useWorkout";
import ExerciseCard from "@/components/ExerciseCard";
export default function NewWorkoutPage() {

    const [openCard, setOpenCard] = useState<boolean>(false);
    const { addWorkout, workout, setWorkout } = useWorkout();
    const { loading } = useAuth();
    const { handleTargetMuscle, handleExerciseSearch,
        searchTargetMuscle, selectedTargetMuscle,
        setSelectedTargetMuscle, exerciesFound, searchTerms,
        setSearchTerms, filteredExercises, selectedBodyPart, setSelectedBodyPart,
        selectedExercises, setSelectedExercises } = useExercises();
    const uniqueMuscle = [...new Set(searchTargetMuscle)];


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Dumbbell className="w-8 h-8 text-orange-500" />
                        Criar Novo Programa de Treino
                    </h1>
                    <p className="text-gray-600 mt-2 ml-1">
                        Monte seu treino personalizado adicionando exercícios
                    </p>
                </div>

                {/* Card Principal */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
                    {/* Header do Card */}
                    <button
                        onClick={() => setOpenCard(!openCard)}
                        className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-orange-50/50 transition-all duration-300 group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-100 rounded-xl group-hover:bg-orange-200 transition-colors">
                                <Plus className={`w-5 h-5 text-orange-600 transition-transform duration-300 ${openCard ? 'rotate-45' : ''}`} />
                            </div>
                            <div className="text-left">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {openCard ? 'Adicionar Exercícios' : 'Clique para adicionar exercícios'}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {openCard ? 'Selecione os exercícios para seu treino' : `${exerciesFound.length} exercícios encontrados`}
                                </p>
                            </div>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openCard ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Conteúdo Expandido */}
                    <div className={`
                        transition-all duration-500 ease-in-out overflow-hidden
                        ${openCard ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}
                    `}>
                        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                            <form className="space-y-6">
                                {/* Grid de 2 colunas para informações do treino */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Nome do Treino
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Ex: Treino A - Peito"
                                                className="w-full px-4 py-2.5 pl-10 bg-white border border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                                                value={workout.name}
                                                onChange={(e) => setWorkout({ ...workout, name: e.target.value })}
                                            />
                                            <Dumbbell className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                                        </div>
                                    </div>



                                    <SelectComponent
                                        label="Dia da Semana"
                                        options={[
                                            { key: 'Segunda-feira', value: 1 },
                                            { key: 'Terça-feira', value: 2 },
                                            { key: 'Quarta-feira', value: 3 },
                                            { key: 'Quinta-feira', value: 4 },
                                            { key: 'Sexta-feira', value: 5 },
                                            { key: 'Sábado', value: 6 },
                                            { key: 'Domingo', value: 7 },
                                        ]}
                                        onChange={(value) => setWorkout({ ...workout, dateWorkout: Number(value) })}
                                        value={workout.dateWorkout || ''}

                                    />

                                </div>

                                {/* Seletor de Parte do Corpo */}
                                <div className="space-y-2">

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <SelectComponent
                                            options={bodyParts}
                                            onChange={(value) => {
                                                setSelectedBodyPart(value);
                                                handleTargetMuscle(value);
                                            }}
                                            value={selectedBodyPart}
                                            label="Parte do Corpo"
                                        />

                                        {


                                            searchTargetMuscle &&
                                            <div className="flex-1" >

                                                <SelectComponent
                                                    label="Músculo Alvo"
                                                    value={selectedTargetMuscle}
                                                    onChange={(value) => setSelectedTargetMuscle(value)}
                                                    options={uniqueMuscle.map(muscle => ({ key: muscle, value: muscle }))}

                                                />
                                            </div>
                                        }




                                        {selectedBodyPart && selectedTargetMuscle && (
                                            <button
                                                className="px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs transition-all duration-200 flex items-center gap-2 shadow-l shadow-orange-200 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleExerciseSearch(selectedBodyPart);
                                                    
                                                }}
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <>
                                                        <div className="w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                        Buscando...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Search className="w-4 h-4" />
                                                        Buscar Exercícios
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Barra de Pesquisa */}
                                {exerciesFound.length > 0 && (
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Pesquisar exercícios..."
                                            className="w-full px-4 py-2.5 pl-10 bg-white border border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                                            value={searchTerms}
                                            onChange={(e) => setSearchTerms(e.target.value)}
                                        />
                                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                                        {searchTerms && (
                                            <button
                                                onClick={() => setSearchTerms('')}
                                                className="absolute right-3 top-3.5"
                                            >
                                                <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* Tabela de Exercícios */}
                                {exerciesFound.length > 0 && (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium text-gray-700">
                                                Exercícios Encontrados ({filteredExercises.length})
                                            </h3>
                                            <span className="text-xs text-gray-500">
                                                {exerciesFound.length} no total
                                            </span>
                                        </div>

                                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                            <div className="max-h-64 overflow-y-auto">
                                                <table className="w-full">
                                                    <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                                                        <tr>
                                                            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                                                                Nome do Exercício
                                                            </th>
                                                            <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                                                                Ação
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-100">
                                                        {filteredExercises.map((exercise, index) => (
                                                            <tr
                                                                key={exercise.id || index}
                                                                className="hover:bg-orange-50/50 transition-colors"
                                                            >
                                                                <td className="px-4 py-3 text-sm text-gray-900">
                                                                    {exercise.name}
                                                                </td>
                                                                <td className="px-4 py-3 text-right">
                                                                    <button
                                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-medium transition-all duration-200 shadow-sm hover:shadow"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            setSelectedExercises([...selectedExercises, exercise]);
                                                                        }}
                                                                    >
                                                                        <Plus className="w-3 h-3" />
                                                                        Adicionar
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}

                                                        {filteredExercises.length === 0 && (
                                                            <tr>
                                                                <td colSpan={2} className="px-4 py-8 text-center">
                                                                    <div className="text-gray-400">
                                                                        <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                                                        <p className="text-sm">Nenhum exercício encontrado</p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Botões de Ação */}
                                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
                                    <button
                                        className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setOpenCard(false);
                                            setSelectedBodyPart('');
                                            setSelectedTargetMuscle('');
                                            setSelectedExercises([]);
                                            setSearchTerms('');
                                        }}
                                    >
                                        <X className="w-4 h-4" />
                                        Cancelar
                                    </button>

                                    <button
                                        className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-orange-200 hover:shadow-xl"
                                        onClick={async () => {
                                            try {
                                                await addWorkout(workout);
                                                alert('Treino salvo com sucesso!');
                                            } catch (error) {
                                                console.error('Erro ao salvar treino:', error);
                                                alert('Erro ao salvar treino.');
                                            }
                                        }}
                                    >
                                        <Save className="w-4 h-4" />
                                        Salvar Treino
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Resumo do Treino (se houver exercícios) */}
                {selectedExercises.length > 0 && 
                    <ExerciseCard selectedExercises={selectedExercises} setSelectedExercises={setSelectedExercises}></ExerciseCard>
                }
            </div>
        </div>
                    
      
    );
}