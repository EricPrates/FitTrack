
"use client";
import { useEffect, useState } from "react";
import { getAllExercises } from "@/lib/hooks/useExercises";

export default function Exercises() {
    const [exercises , setExercises] = useState<any[]>([]);


    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await getAllExercises();
                setExercises(response);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };
        fetchExercises();
    }, []);

    return (

        <div>
            <h1>Exercises</h1>
            <ul>
                {exercises.map((exercise) => (
                    <li key={exercise.exerciseId}>
                        <h2>{exercise.name}</h2>
                        <img src={exercise.gifUrl} alt={exercise.name} />
                        <p>Target Muscles: {exercise.targetMuscles.join(', ')}</p>
                        <p>Body Parts: {exercise.bodyParts.join(', ')}</p>
                        <p>Equipments: {exercise.equipments.join(', ')}</p>
                        <p>Secondary Muscles: {exercise.secondaryMuscles.join(', ')}</p>
                        <p>Instructions: {exercise.instructions}</p>
                    </li>
                ))}
            </ul>
        </div>

    );
}