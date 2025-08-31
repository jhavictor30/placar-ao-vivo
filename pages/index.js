import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [destaques, setDestaques] = useState([]);
  const [jogosAoVivo, setJogosAoVivo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("destaques");

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
    const fetchJogos = async () => {
      try {
        const res = await fetch("/api/jogos");
        const data = await res.json();

        if (data.jogos) {
          // Filtrar jogos ao vivo
          const aoVivo = data.jogos.filter(j => j.status === "ao vivo");
          setJogosAoVivo(aoVivo);
          
          // Filtrar destaques (ao vivo + próximos)
          const jogosFiltrados = data.jogos.filter(
            (j) => j.status === "ao vivo" || j.status === "próximo"
          );
          setDestaques(jogosFiltrados.slice(0, 10));
        }
      } catch (error) {
        console.error("Erro ao carregar jogos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJogos();
    
    // Atualizar dados a cada 60 segundos
    const interval = setInterval(fetchJogos, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Abas de navegação */}
      <div className="border-b border-flash-border mb-4">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab("destaques")}
            className={`px-4 py-2 font-medium ${activeTab === "destaques" 
              ? "border-b-2 border-flash-yellow text-flash-yellow" 
              : "text-flash-text-secondary hover:text-flash-text"}`}
          >
            Destaques
          </button>
          <button
            onClick={() => setActiveTab("aovivo")}
            className={`px-4 py-2 font-medium flex items-center ${activeTab === "aovivo" 
              ? "border-b-2 border-flash-red text-flash-red" 
              : "text-flash-text-secondary hover:text-flash-text"}`}
          >
            {activeTab === "aovivo" && (
              <span className="animate-pulse-fast mr-1 h-2 w-2 rounded-full bg-flash-red"></span>
            )}
            Ao Vivo ({jogosAoVivo.length})
          </button>
          <button
            onClick={() => setActiveTab("favoritos")}
            className={`px-4 py-2 font-medium ${activeTab === "favoritos" 
              ? "border-b-2 border-flash-yellow text-flash-yellow" 
              : "text-flash-text-secondary hover:text-flash-text"}`}
          >
            Favoritos
          </button>
        </div>
      </div>

      {/* Lista de jogos */}
      <div className="w-full">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-flash-yellow"></div>
          </div>
        ) : (
          <>
            {/* Conteúdo da aba Destaques */}
            {activeTab === "destaques" && (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-flash-text">
                  Destaques de hoje
                </h3>
                
                {destaques.length === 0 ? (
                  <p className="text-flash-text-secondary">Nenhuma partida em destaque agora.</p>
                ) : (
                  <div className="space-y-2">
                    {destaques.map((jogo, index) => (
                      <div
                        key={index}
                        className="bg-flash-card border border-flash-border rounded-lg overflow-hidden hover:bg-flash-hover transition cursor-pointer"
                      >
                        {/* Cabeçalho do jogo */}
                        <div className="bg-flash-dark px-3 py-1 flex justify-between items-center">
                          <span className="text-xs text-flash-text-secondary">{jogo.campeonato}</span>
                          <span 
                            className={`text-xs font-medium px-2 py-0.5 rounded-full ${jogo.status === "ao vivo" 
                              ? "bg-flash-red text-white" 
                              : "bg-flash-blue bg-opacity-20 text-flash-blue"}`}
                          >
                            {jogo.status === "ao vivo" ? "AO VIVO" : "HOJE"}
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
                              <span className={`font-bold text-lg ${jogo.status === "ao vivo" ? "text-flash-yellow" : "text-flash-text"}`}>
                                {jogo.placarCasa ?? "0"}
                              </span>
                              <span className="text-flash-text-secondary">-</span>
                              <span className={`font-bold text-lg ${jogo.status === "ao vivo" ? "text-flash-yellow" : "text-flash-text"}`}>
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
                          
                          {/* Tempo de jogo */}
                          {jogo.status === "ao vivo" && (
                            <div className="mt-2 text-center">
                              <span className="text-flash-red text-sm animate-pulse-fast">
                                {jogo.tempo || "45"}'
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Conteúdo da aba Ao Vivo */}
            {activeTab === "aovivo" && (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-flash-red flex items-center">
                  <span className="animate-pulse-fast mr-2 h-3 w-3 rounded-full bg-flash-red"></span>
                  Jogos ao vivo
                </h3>
                
                {jogosAoVivo.length === 0 ? (
                  <p className="text-flash-text-secondary">Nenhuma partida ao vivo no momento.</p>
                ) : (
                  <div className="space-y-2">
                    {jogosAoVivo.map((jogo, index) => (
                      <div
                        key={index}
                        className="bg-flash-card border border-flash-border rounded-lg overflow-hidden hover:bg-flash-hover transition cursor-pointer"
                      >
                        {/* Cabeçalho do jogo */}
                        <div className="bg-flash-dark px-3 py-1 flex justify-between items-center">
                          <span className="text-xs text-flash-text-secondary">{jogo.campeonato}</span>
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-flash-red text-white">
                            AO VIVO
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
                              <span className="font-bold text-lg text-flash-yellow">
                                {jogo.placarCasa ?? "0"}
                              </span>
                              <span className="text-flash-text-secondary">-</span>
                              <span className="font-bold text-lg text-flash-yellow">
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
                          
                          {/* Tempo de jogo */}
                          <div className="mt-2 text-center">
                            <span className="text-flash-red text-sm animate-pulse-fast">
                              {jogo.tempo || "45"}'
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Conteúdo da aba Favoritos */}
            {activeTab === "favoritos" && (
              <div className="text-center py-10">
                <div className="text-flash-yellow text-5xl mb-4">⭐</div>
                <h3 className="text-xl font-semibold mb-2">Nenhum favorito ainda</h3>
                <p className="text-flash-text-secondary mb-4">Adicione jogos aos favoritos para acompanhá-los facilmente</p>
                <Link href="/jogos" className="px-4 py-2 bg-flash-yellow text-black rounded-md font-medium hover:bg-opacity-90 transition">
                  Ver todos os jogos
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
