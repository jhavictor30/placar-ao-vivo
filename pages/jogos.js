// pages/jogos.js
import { useEffect, useState } from "react";

export default function Jogos() {
  const [jogos, setJogos] = useState([]);
  const [filtro, setFiltro] = useState("all");
  const [loading, setLoading] = useState(true);

  // Buscar jogos da API interna
  useEffect(() => {
    const fetchJogos = async () => {
      try {
        const res = await fetch("/api/jogos");
        const data = await res.json();

        if (data.jogos) {
          setJogos(data.jogos);
        }
      } catch (error) {
        console.error("Erro ao carregar jogos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJogos();
  }, []);

  // Filtrar jogos pelo status
  const jogosFiltrados = jogos.filter((jogo) => {
    if (filtro === "all") return true;
    if (filtro === "live") return jogo.status === "ao vivo";
    if (filtro === "upcoming") return jogo.status === "próximo";
    if (filtro === "finished") return jogo.status === "encerrado";
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-green-600 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Jogos de Futebol
      </h1>

      {/* Botões de filtro */}
      <div className="flex gap-3 justify-center mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            filtro === "all" ? "bg-yellow-500" : "bg-gray-700"
          }`}
          onClick={() => setFiltro("all")}
        >
          Todos
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            filtro === "live" ? "bg-red-500" : "bg-gray-700"
          }`}
          onClick={() => setFiltro("live")}
        >
          Ao vivo
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            filtro === "upcoming" ? "bg-blue-500" : "bg-gray-700"
          }`}
          onClick={() => setFiltro("upcoming")}
        >
          Próximos
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            filtro === "finished" ? "bg-green-500" : "bg-gray-700"
          }`}
          onClick={() => setFiltro("finished")}
        >
          Encerrados
        </button>
      </div>

      {/* Lista de jogos */}
      {loading ? (
        <p className="text-center">Carregando jogos...</p>
      ) : jogosFiltrados.length === 0 ? (
        <p className="text-center">Nenhum jogo encontrado.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jogosFiltrados.map((jogo) => (
            <div
              key={jogo.id}
              className="bg-white text-black rounded-xl p-4 shadow-lg"
            >
              <h2 className="font-bold text-lg mb-2">{jogo.campeonato}</h2>
              <div className="flex justify-between items-center mb-2">
                <span>{jogo.timeCasa}</span>
                <span className="font-bold">
                  {jogo.placarCasa} x {jogo.placarFora}
                </span>
                <span>{jogo.timeFora}</span>
              </div>
              <p className="text-sm text-gray-600">
                Status:{" "}
                <span
                  className={`font-bold ${
                    jogo.status === "ao vivo"
                      ? "text-red-500"
                      : jogo.status === "próximo"
                      ? "text-blue-500"
                      : "text-gray-700"
                  }`}
                >
                  {jogo.status}
                </span>
              </p>
              <p className="text-xs text-gray-500">
                Horário: {new Date(jogo.horario).toLocaleString("pt-BR")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
