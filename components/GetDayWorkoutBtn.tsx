import { Calendar, Clock, ChevronRight, Dumbbell } from "lucide-react";
import { daysOfWeek, Workout } from "@/app/types/types";
import { getDayColor } from "@/app/types/types";

export default function GetDayWorkoutBtn({ className, index, onClick, workout }: { className?: string, index: number, onClick: () => any, workout: Workout }) {
    const dayIndex = workout?.dateworkout || 0;
    const dayInfo = daysOfWeek.find(d => d.value === dayIndex);

    return (
    <button
        key={index}
        onClick={onClick}
        className={`${className || ''}`}
    >
     
        <div className={`h-2 bg-gradient-to-r ${getDayColor(dayIndex)}`}></div>

        <div className="p-6">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${getDayColor(dayIndex)} text-white shadow-lg`}>
                    <Dumbbell className="h-6 w-6" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">
                {workout.name}
            </h3>

            <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                    <span className="text-sm font-medium">{dayInfo?.key}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">{dayInfo?.value}</span>
                </div>

                <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-orange-500" />
                    <span className="text-sm">
                        Criado em {new Date(workout.created_at?.toString() || '').toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                        })}
                    </span>
                </div>
            </div>


        </div>
    </button>
    );
}