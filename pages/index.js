export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">⚽ Placar ao Vivo</h1>
      <p className="mt-4 text-gray-700">Bem-vindo ao site! 🚀</p>

      <div className="mt-6 flex gap-4">
        <a href="/jogos" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Ver Jogos
        </a>
        <a href="/tabelas" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Ver Tabelas
        </a>
      </div>
    </div>
  );
}
