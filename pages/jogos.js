import { useEffect, useState } from "react";

export default function Jogos() {
  const [jogos, setJogos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState("all");

  const fetchJogos = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/jogos");
      const data = await res.json();
      setJogos(data);
    } catch (error) {
      console.error("Erro ao carregar jogos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJogos();
    const interval = setInterval(fetchJogos, 30000); // atualiza a cada 30s
    return () => clearInterval(interval);
  }, []);

  // Filtrar jogos
  const jogosFiltrados = jogos.filter((jogo) => {
    if (filtro === "all") return true;
    if (filtro === "live") return jogo.status === "ao vivo";
    if (filtro === "upcoming") return jogo.status === "próximo";
    if (filtro === "ended") return jogo.status === "encerrado";
    return true;
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-600 to-green-600 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Jogos de Futebol</h1>

      {/* Filtros */}
      <div className="flex justify-center gap-3 mb-6">
        <button
          className={`px-4 py-2 rounded-full ${filtro === "live" ? "bg-red-500" : "bg-gray-700"}`}
          onClick={() => setFiltro("live")}
        >
          Ao Vivo
        </button>
        <button
          className={`px-4 py-2 rounded-full ${filtro === "upcoming" ? "bg-blue-500" : "bg-gray-700"}`}
          onClick={() => setFiltro("upcoming")}
        >
          Próximos
        </button>
        <button
          className={`px-4 py-2 rounded-full ${filtro === "ended" ? "bg-green-500" : "bg-gray-700"}`}
          onClick={() => setFiltro("ended")}
        >
          Encerrados
        </button>
        <button
          className={`px-4 py-2 rounded-full ${filtro === "all" ? "bg-yellow-500" : "bg-gray-700"}`}
          onClick={() => setFiltro("all")}
        >
          Todos
        </button>
      </div>

      {loading && <p className="text-center">Carregando jogos...</p>}

      <div className="space-y-6">
        {jogosFiltrados.map((jogo, index) => (
          <div key={index} className="bg-gray-900 p-4 rounded-xl shadow-md">
            {/* Campeonato */}
            <h2 className="text-lg font-bold mb-2">{jogo.campeonato}</h2>

            {/* Times */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img src={jogo.homeLogo} alt="Home" className="w-6 h-6" />
                <span>{jogo.home}</span>
              </div>
              <span className="text-xl font-bold">{jogo.placar}</span>
              <div className="flex items-center gap-2">
                <img src={jogo.awayLogo} alt="Away" className="w-6 h-6" />
                <span>{jogo.away}</span>
              </div>
            </div>

            {/* Status */}
            <p className="mt-2 text-sm text-gray-300">
              🏟 {jogo.estadio} | 📅 {jogo.data} | 📌 {jogo.status}
            </p>

            {/* Estatísticas */}
            {jogo.statistics.length > 0 && (
              <div className="mt-3 text-sm text-gray-200">
                <p>📊 Posse de bola: {jogo.statistics[0]?.possession || "N/A"}%</p>
                <p>🎯 Chutes: {jogo.statistics[0]?.shots || "N/A"}</p>
                <p>
                  🟨 {jogo.statistics[0]?.yellow || 0} | 🟥 {jogo.statistics[0]?.red || 0}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
