

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-bold text-gray-900">
              Fit<span className="text-blue-600">Track</span>
            </p>
            <p className="text-gray-600 mt-2">Sua jornada fitness começa aqui</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition">
              Termos
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition">
              Privacidade
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition">
              Contato
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-100 text-center text-gray-500">
          <p className="flex items-center justify-center">
            Feito com    para amantes de fitness
          </p>
          <p className="mt-2">© {new Date().getFullYear()} FitTrack. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}