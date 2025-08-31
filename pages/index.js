import { useEffect, useState } from "react";

export default function Home() {
  const [destaques, setDestaques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const campeonatos = [
    "Brasileirão Série A",
    "Copa do Brasil",
    "Libertadores",
    "Champions League",
    "Premier League",
    "La Liga",
    "Serie A (Itália)",
  ];

  useEffect(() => {
    const fetchDestaques = async () => {
      try {
        const res = await fetch("/api/jogos");
        const data = await res.json();

        if (data.jogos) {
          const jogosFiltrados = data.jogos.filter(
            (j) => j.status === "ao vivo" || j.status === "próximo"
          );
          setDestaques(jogosFiltrados.slice(0, 10));
        }
      } catch (error) {
        console.error("Erro ao carregar destaques:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestaques();
  }, []);

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white flex">
      {/* Sidebar Desktop */}
      <aside className="w-64 bg-[#111] border-r border-gray-800 hidden md:block sticky top-0 h-screen">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-lg font-bold text-green-500">🏆 Campeonatos</h2>
        </div>
        <nav className="p-4 space-y-2">
          {campeonatos.map((camp, i) => (
            <button
              key={i}
              className="block w-full text-left px-3 py-2 rounded hover:bg-[#2a2a2a] text-sm"
            >
              {camp}
            </button>
          ))}
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#111] py-4 shadow-md sticky top-0 z-20">
          <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
            {/* Botão hambúrguer no mobile */}
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>

            <h1 className="text-xl font-bold text-green-500">⚽ Placar ao Vivo</h1>

            <nav className="space-x-4 hidden sm:block">
              <button className="text-sm hover:text-green-400">Todos</button>
              <button className="text-sm hover:text-green-400">Ao vivo</button>
              <button className="text-sm hover:text-green-400">Meus Jogos</button>
            </nav>
          </div>
        </header>

        {/* Lista de jogos */}
        <main className="max-w-5xl mx-auto px-4 py-6 w-full">
          <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
            Destaques de hoje
          </h3>

          {loading ? (
            <p>Carregando...</p>
          ) : destaques.length === 0 ? (
            <p className="text-gray-400">Nenhuma partida em destaque agora.</p>
          ) : (
            <div className="divide-y divide-gray-700 border border-gray-700 rounded-lg">
              {destaques.map((jogo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-4 py-3 hover:bg-[#2a2a2a] transition"
                >
                  {/* Esquerda */}
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">{jogo.campeonato}</span>
                    <div className="flex items-center gap-2">
                      <span>{jogo.timeCasa}</span>
                      <span className="font-bold text-green-500">{jogo.golsCasa}</span>
                      <span className="mx-1">x</span>
                      <span className="font-bold text-green-500">{jogo.golsFora}</span>
                      <span>{jogo.timeFora}</span>
                    </div>
                  </div>

                  {/* Direita */}
                  <div className="text-right">
                    <p
                      className={`text-sm font-semibold ${
                        jogo.status === "ao vivo"
                          ? "text-green-400 animate-pulse"
                          : "text-gray-400"
                      }`}
                    >
                      {jogo.status === "ao vivo"
                        ? `AO VIVO ${jogo.tempo}’`
                        : jogo.horario}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Overlay do menu mobile */}
      {menuOpen && (
        <div className="fixed inset-0 z-30 flex">
          {/* Fundo escuro */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Sidebar Mobile */}
          <aside className="relative w-64 bg-[#111] h-full shadow-lg z-40 animate-slide-in">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-lg font-bold text-green-500">🏆 Campeonatos</h2>
              <button
                className="text-white"
                onClick={() => setMenuOpen(false)}
              >
                ✖
              </button>
            </div>
            <nav className="p-4 space-y-2">
              {campeonatos.map((camp, i) => (
                <button
                  key={i}
                  className="block w-full text-left px-3 py-2 rounded hover:bg-[#2a2a2a] text-sm"
                >
                  {camp}
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
}
