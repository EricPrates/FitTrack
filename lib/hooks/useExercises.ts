import { useState } from 'react';
import { supabase } from '../server/supabase';
import { useAuth } from '../../app/api/contexts/Auth';
import { Exercise } from '@/app/types/types';
export const useExercises = () => {
  const [searchTargetMuscle, setSearchTargetMuscle] = useState<string[]>([]);
  const { startLoading, stopLoading } = useAuth();
  const [selectedTargetMuscle, setSelectedTargetMuscle] = useState<string>('');
  const [exerciesFound, setExerciesFound] = useState<Exercise[]>([]);
  const [searchTerms, setSearchTerms] = useState<string>('');
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('');
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

 
  
  const handleTargetMuscle = async (bodyPart: string) => {

    startLoading();
    const { data, error } = await supabase
      .from('exercise')
      .select('targetmuscles')
      .contains('bodyparts', [bodyPart]);
    if (error) {
      console.log('Erro:', error.message);
      setSearchTargetMuscle([]);
      stopLoading();
      return [];
    }
    setSearchTargetMuscle(data?.flatMap(exercise => exercise.targetmuscles) || []);
    stopLoading();
  };

  const handleExerciseSearch = async (selectedBodyPart: string) => {
    if (!selectedBodyPart) return;

    startLoading();
    try {
      const { data, error } = await supabase
        .from('exercise')
        .select('*')
        .overlaps('bodyparts', [selectedBodyPart],)
        .overlaps('targetmuscles', [selectedTargetMuscle],);

      if (error) {
        console.log('Erro:', error.message);
        setExerciesFound([]);
        return;
      }

      setExerciesFound(data || []);
    } catch (err: any) {
      console.log('Erro:', err.message);
      setExerciesFound([]);
    } finally {
      stopLoading();
    }
  };

  // Filtra exercícios baseado no termo de busca
  const filteredExercises = exerciesFound.filter(exercise =>
    exercise.name?.toLowerCase().includes(searchTerms.toLowerCase())
  );
  return {
    searchTargetMuscle,
    handleTargetMuscle,
    selectedTargetMuscle,
    setSelectedTargetMuscle,
    exerciesFound,
    setSelectedExercises,
    selectedExercises,
    handleExerciseSearch,
    searchTerms,
    setSearchTerms,
    filteredExercises,
    selectedBodyPart,
    setSelectedBodyPart,
    


  }
}

