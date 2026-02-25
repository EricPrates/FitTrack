'use client'

import { useState, useEffect } from 'react'
import { 
  Activity, Calendar, Target,
  Flame, Heart, Zap, Clock,
  Dumbbell, User, Settings, LogOut,
  ChevronRight, Plus
} from 'lucide-react'
import { supabase } from '@/lib/server/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '../api/contexts/Auth'
import { Workout_logs } from '../types/types'


interface Metric {
  name: string
  value: string
  change: number
  icon: React.ReactNode
  color: string
}

export default function Dashboard() {
  const { user, logout } = useAuth()!;
  const [workouts, setWorkouts] = useState<Workout_logs[]>([])
  const router = useRouter()

 
  const metrics: Metric[] = [
    { 
      name: 'Calorias', 
      value: '1,250', 
      change: +12, 
      icon: <Flame className="h-5 w-5" />,
      color: 'bg-orange-100 text-orange-600'
    },
    { 
      name: 'Tempo', 
      value: '2h 15m', 
      change: +25, 
      icon: <Clock className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-600'
    },
    { 
      name: 'Streak', 
      value: '7 dias', 
      change: +1, 
      icon: <Zap className="h-5 w-5" />,
      color: 'bg-yellow-100 text-yellow-600'
    },
  ]

  

  // Obter dados do usuário
  useEffect(() => {
    const fetchUser = async () => {
      const { data: workouts } = await supabase
        .from('workouts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)
      setWorkouts(workouts || [])
    }
    fetchUser()
  }, [])

  // Sair da conta
  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  // Formatar data
  function formatDate(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', { 
      day: 'numeric',
      month: 'short'
    })
  }

  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-600 rounded-lg">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">FitTrack</h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{user?.name || 'Usuário'}</p>
                <p className="text-xs text-gray-500">{user?.email || ''}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                title="Sair"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        {/* Saudação */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Olá, {user?.name?.split(' ')[0] || 'Atleta'}!
          </h2>
          <p className="text-gray-600">Bem-vindo ao seu dashboard</p>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg border p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${metric.color}`}>
                  {metric.icon}
                </div>
                <span className={`text-sm ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change >= 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
              <h3 className="text-lg font-bold">{metric.value}</h3>
              <p className="text-sm text-gray-500">{metric.name}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Treinos Recentes</h3>
                <Link 
                  href="/workouts"
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                >
                  Ver todos <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="space-y-3">
                {workouts.map((workout) => (
                  <div 
                    key={workout.id} 
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {workout.description === 'cardio' && <Activity className="h-5 w-5 text-blue-500" />}
                        {workout.description === 'strength' && <Dumbbell className="h-5 w-5 text-purple-500" />}
                        {workout.description === 'flexibility' && <Target className="h-5 w-5 text-green-500" />}
                      </div>
                      <div>
                        <h4 className="font-medium">{workout.name}</h4>
                        <p className="text-sm text-gray-500">
                          {workout.duration_minutes} min • {formatDate(workout.created_at?.toString() || '')}
                        </p>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>

              <Link 
                href="/workouts/new"
                className="mt-4 w-full py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-orange-400 hover:text-gray-800 transition flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Planeje seus treinos
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Próximo Treino */}
            <div className="bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg p-5 text-white">
              <h3 className="font-semibold mb-2">Próximo Treino</h3>
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="h-4 w-4 text-white" />
                <span className="text-sm text-white">Amanhã, 18:00</span>
              </div>
              <div className="mb-4">
                <div className="text-lg font-bold">Treino de Costas</div>
                <p className="text-sm text-white/90">4 exercícios • 45 min</p>
              </div>
              <button className="w-full bg-white text-red-600 py-2 rounded-lg font-medium hover:bg-red-50 transition">
                Começar
              </button>
            </div>

            {/* Menu Rápido */}
            <div className="bg-white rounded-lg border p-5">
              <h3 className="font-semibold mb-3">Menu Rápido</h3>
              <div className="space-y-2">
                <Link 
                  href="/exercises"
                  className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-2">
                    <Dumbbell className="h-5 w-5 text-blue-600" />
                    <span>Exercícios</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
                
                <Link 
                  href="/profile"
                  className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-purple-600" />
                    <span>Meu Perfil</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
                
                <Link 
                  href="/settings"
                  className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-gray-600" />
                    <span>Configurações</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </div>
            </div>

            {/* Meta do Mês */}
            <div className="bg-white rounded-lg border p-5">
              <h3 className="font-semibold mb-3">Meta do Mês</h3>
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Treinos</span>
                  <span>8/16</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 to-yellow-500 rounded-full"
                    style={{ width: '50%' }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Continue assim! Você está na metade.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t text-center text-gray-500 text-sm">
          <p>FitTrack © {new Date().getFullYear()}</p>
        </div>
      </div>

      {/* Navegação Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t py-3 px-6">
        <div className="flex justify-between">
          <Link href="/dashboard" className="flex flex-col items-center text-blue-600">
            <Activity className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link href="/exercises" className="flex flex-col items-center text-gray-600">
            <Dumbbell className="h-5 w-5" />
            <span className="text-xs mt-1">Exercícios</span>
          </Link>
          <Link href="/workouts" className="flex flex-col items-center text-gray-600">
            <Target className="h-5 w-5" />
            <span className="text-xs mt-1">Treinos</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center text-gray-600">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Perfil</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

