import Link from "next/link";


export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
         
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Fit<span className="text-orange-600">Track</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="font-medium text-gray-700 hover:text-orange-600 transition">
            Início
          </Link>
          <Link href="/exercicios" className="font-medium text-gray-700 hover:text-orange-600 transition">
            Exercícios
          </Link>
          <Link href="/treinos" className="font-medium text-gray-700 hover:text-orange-600 transition">
            Treinos
          </Link>
          <Link href="/sobre" className="font-medium text-gray-700 hover:text-orange-600 transition">
            Sobre
          </Link>
        </nav>
        
        <button className="bg-orange-600 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-700 transition shadow-md">
          Começar
        </button>
      </div>
    </header>
  );
}