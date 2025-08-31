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
    
    // Atualizar dados a cada 60 segundos para jogos ao vivo
    const interval = setInterval(fetchJogos, 60000);
    return () => clearInterval(interval);
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
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6 text-flash-text">
        Todos os Jogos
      </h1>

      {/* Botões de filtro */}
      <div className="flex gap-2 mb-6 border-b border-flash-border pb-2">
        <button
          className={`px-4 py-2 rounded-md font-medium transition ${filtro === "all" 
            ? "bg-flash-dark text-flash-text" 
            : "bg-transparent text-flash-text-secondary hover:text-flash-text"}`}
          onClick={() => setFiltro("all")}
        >
          Todos
        </button>
        <button
          className={`px-4 py-2 rounded-md font-medium transition flex items-center ${filtro === "live" 
            ? "bg-flash-red text-white" 
            : "bg-transparent text-flash-text-secondary hover:text-flash-text"}`}
          onClick={() => setFiltro("live")}
        >
          {filtro === "live" && (
            <span className="animate-pulse-fast mr-1 h-2 w-2 rounded-full bg-white"></span>
          )}
          Ao vivo
        </button>
        <button
          className={`px-4 py-2 rounded-md font-medium transition ${filtro === "upcoming" 
            ? "bg-flash-blue text-white" 
            : "bg-transparent text-flash-text-secondary hover:text-flash-text"}`}
          onClick={() => setFiltro("upcoming")}
        >
          Próximos
        </button>
        <button
          className={`px-4 py-2 rounded-md font-medium transition ${filtro === "finished" 
            ? "bg-flash-green text-white" 
            : "bg-transparent text-flash-text-secondary hover:text-flash-text"}`}
          onClick={() => setFiltro("finished")}
        >
          Encerrados
        </button>
      </div>

      {/* Lista de jogos */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-flash-yellow"></div>
        </div>
      ) : jogosFiltrados.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-flash-text-secondary">Nenhum jogo encontrado para este filtro.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {jogosFiltrados.map((jogo, index) => (
            <div
              key={index}
              className="bg-flash-card border border-flash-border rounded-lg overflow-hidden hover:bg-flash-hover transition cursor-pointer"
            >
              {/* Cabeçalho do jogo */}
              <div className="bg-flash-dark px-3 py-1 flex justify-between items-center">
                <span className="text-xs text-flash-text-secondary">{jogo.campeonato}</span>
                <span 
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    jogo.status === "ao vivo"
                      ? "bg-flash-red text-white" 
                      : jogo.status === "próximo"
                      ? "bg-flash-blue bg-opacity-20 text-flash-blue"
                      : "bg-flash-green bg-opacity-20 text-flash-green"
                  }`}
                >
                  {jogo.status === "ao vivo" ? "AO VIVO" : 
                   jogo.status === "próximo" ? "HOJE" : "ENCERRADO"}
                </span>
              </div>
              
              {/* Conteúdo do jogo */}
              <div className="p-3">
                <div className="flex items-center justify-between">
                  {/* Time Casa */}
                  <div className="flex items-center space-x-2 w-2/5">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs">
                      {jogo.timeCasa?.charAt(0)}
                    </div>
                    <span className="font-medium truncate">{jogo.timeCasa}</span>
                  </div>
                  
                  {/* Placar */}
                  <div className="flex items-center justify-center space-x-2 w-1/5">
                    <span className={`font-bold text-lg ${
                      jogo.status === "ao vivo" 
                        ? "text-flash-yellow" 
                        : jogo.status === "encerrado"
                        ? "text-flash-text"
                        : "text-flash-text-secondary"
                    }`}>
                      {jogo.placarCasa ?? "0"}
                    </span>
                    <span className="text-flash-text-secondary">-</span>
                    <span className={`font-bold text-lg ${
                      jogo.status === "ao vivo" 
                        ? "text-flash-yellow" 
                        : jogo.status === "encerrado"
                        ? "text-flash-text"
                        : "text-flash-text-secondary"
                    }`}>
                      {jogo.placarFora ?? "0"}
                    </span>
                  </div>
                  
                  {/* Time Fora */}
                  <div className="flex items-center justify-end space-x-2 w-2/5">
                    <span className="font-medium text-right truncate">{jogo.timeFora}</span>
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs">
                      {jogo.timeFora?.charAt(0)}
                    </div>
                  </div>
                </div>
                
                {/* Tempo de jogo ou horário */}
                <div className="mt-2 text-center">
                  {jogo.status === "ao vivo" ? (
                    <span className="text-flash-red text-sm animate-pulse-fast">
                      {jogo.tempo || "45"}'
                    </span>
                  ) : jogo.status === "próximo" ? (
                    <span className="text-flash-text-secondary text-sm">
                      {new Date(jogo.horario).toLocaleTimeString("pt-BR", {hour: "2-digit", minute:"2-digit"})}
                    </span>
                  ) : (
                    <span className="text-flash-green text-sm">
                      Encerrado
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
