'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/server/supabase'
import Link from 'next/link'
import { 
  User, Mail, Lock, Eye, EyeOff, 
  CheckCircle, XCircle, Loader2, 
  ArrowLeft, Dumbbell
} from 'lucide-react'

export default function SignUp() {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const router = useRouter()


  const passwordRequirements = [
    { text: 'Mínimo 6 caracteres', met: password.length >= 6 },
    { text: 'Pelo menos 1 letra maiúscula', met: /[A-Z]/.test(password) },
    { text: 'Pelo menos 1 número', met: /\d/.test(password) },
  ]

  const allRequirementsMet = passwordRequirements.every(req => req.met)
  const passwordsMatch = password === confirmPassword

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validações
    if (!name.trim()) {
      setError('Por favor, insira seu nome')
      return
    }

    if (!allRequirementsMet) {
      setError('A senha não atende a todos os requisitos')
      return
    }

    if (!passwordsMatch) {
      setError('As senhas não coincidem')
      return
    }

    setLoading(true)

    try {
 
      const { error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
       
      })

      if (signUpError) {
        setError(signUpError.message)
        return
      }

      // Sucesso
      setSuccess('Conta criada com sucesso! Verifique seu email para confirmar.')
      
      // Limpar formulário
      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')

      // Redirecionar após 3 segundos
      setTimeout(() => {
        router.push('/login')
      }, 3000)

    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-orange-50 p-4">
      <div className="w-full max-w-2xl">
        {/* Card Principal */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 md:flex">
          
          {/* Lado Esquerdo - Ilustração/Info */}
          <div className="md:w-2/5 bg-gradient-to-br from-yellow-500 to-orange-500 p-8 text-white flex flex-col justify-center">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Dumbbell className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold">FitTrack</h2>
              </div>
              <h3 className="text-xl font-semibold mb-3">Junte-se a nós!</h3>
              <p className="text-white-100">
                Crie sua conta e comece sua jornada fitness hoje mesmo. 
                Acompanhe seus progressos e alcance seus objetivos.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white/20 rounded-full">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <span>Acompanhe seus treinos</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white/20 rounded-full">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <span>Monitore seu progresso</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white/20 rounded-full">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <span>Planeje suas metas</span>
              </div>
            </div>
          </div>

          {/* Lado Direito - Formulário */}
          <div className="md:w-3/5 p-8">
            <div className="mb-6">
              <Link 
                href="/login" 
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para login
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Criar Conta</h1>
              <p className="text-gray-600 mt-2">Preencha os dados abaixo para começar</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nome */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    required
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-200 outline-none transition"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-200 outline-none transition"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Senha */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Senha
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-sm text-black-600 hover:text-orange-500 transition"
                  >
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Crie uma senha segura"
                    required
                    className="pl-10 pr-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-200 outline-none transition"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Requisitos da senha */}
                <div className="mt-3 space-y-2">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {req.met ? (
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-gray-300" />
                      )}
                      <span className={`text-sm ${req.met ? 'text-emerald-600' : 'text-gray-500'}`}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confirmar Senha */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirmar Senha
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-sm text-black-600 hover:text-orange-500 transition"
                  >
                    {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Digite a senha novamente"
                    required
                    className={`pl-10 pr-10 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-200 outline-none transition ${
                      confirmPassword
                        ? passwordsMatch
                          ? 'border-yellow-300 bg-yellow-50'
                          : 'border-red-300 bg-red-50'
                        : 'border-gray-300'
                    }`}
                    disabled={loading}
                  />
                  {confirmPassword && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      {passwordsMatch ? (
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {confirmPassword && !passwordsMatch && (
                  <p className="mt-2 text-sm text-red-600">As senhas não coincidem</p>
                )}
              </div>

              {/* Termos e Condições */}
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 mt-1"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  Eu concordo com os{' '}
                  <Link href="/terms" className="text-yellow-500 hover:text-orange-500 font-medium">
                    Termos de Serviço
                  </Link>{' '}
                  e{' '}
                  <Link href="/privacy" className="text-yellow-500 hover:text-orange-500 font-medium">
                    Política de Privacidade
                  </Link>
                </label>
              </div>

              {/* Mensagens de erro/sucesso */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="text-emerald-700 text-sm">{success}</p>
                  <p className="text-emerald-600 text-sm mt-1">Redirecionando para login...</p>
                </div>
              )}

              {/* Botão de Submit */}
              <button
                type="submit"
                disabled={loading || !allRequirementsMet || !passwordsMatch}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Criando conta...
                  </span>
                ) : (
                  'Criar Conta'
                )}
              </button>
            </form>

            {/* Link para Login */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Já tem uma conta?{' '}
                <Link href="/login" className="text-emerald-600 hover:text-emerald-800 font-medium transition">
                  Faça login
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="mt-6 p-4 bg-white/50 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">🔒 Sua segurança é importante</h3>
          <p className="text-sm text-gray-600">
            Suas informações pessoais são protegidas com criptografia e nunca compartilhadas com terceiros.
          </p>
        </div>
      </div>
    </div>
  )
}