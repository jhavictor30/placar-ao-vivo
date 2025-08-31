// pages/tabela.js
import { useEffect, useState } from "react";

export default function Tabela() {
  const [tabela, setTabela] = useState([]);
  const [loading, setLoading] = useState(true);
  const [campeonatoAtivo, setCampeonatoAtivo] = useState("Brasileirão");

  const campeonatos = ["Brasileirão", "Champions League", "Premier League", "La Liga"];

  useEffect(() => {
    const fetchTabela = async () => {
      try {
        const res = await fetch("/api/tabelas");
        const data = await res.json();

        if (data.times) {
          setTabela(data.times);
        }
      } catch (error) {
        console.error("Erro ao carregar tabela:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTabela();
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-flash-text">
        Tabelas de Classificação
      </h2>

      {/* Seletor de campeonatos */}
      <div className="flex gap-2 mb-6 border-b border-flash-border pb-2 overflow-x-auto">
        {campeonatos.map((campeonato) => (
          <button
            key={campeonato}
            className={`px-4 py-2 rounded-md font-medium whitespace-nowrap transition ${campeonatoAtivo === campeonato 
              ? "bg-flash-dark text-flash-text" 
              : "bg-transparent text-flash-text-secondary hover:text-flash-text"}`}
            onClick={() => setCampeonatoAtivo(campeonato)}
          >
            {campeonato}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-flash-yellow"></div>
        </div>
      ) : tabela.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-flash-text-secondary">Nenhum dado disponível para este campeonato.</p>
        </div>
      ) : (
        <div className="bg-flash-card border border-flash-border rounded-lg overflow-hidden">
          <div className="bg-flash-dark px-4 py-2 flex justify-between items-center">
            <span className="font-medium text-flash-text">{campeonatoAtivo}</span>
            <span className="text-xs text-flash-text-secondary">Temporada 2023/24</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-flash-dark text-flash-text-secondary border-b border-flash-border">
                <tr>
                  <th className="py-3 px-4 text-left w-12">#</th>
                  <th className="py-3 px-4 text-left">Time</th>
                  <th className="py-3 px-4 text-center w-12">P</th>
                  <th className="py-3 px-4 text-center w-12">J</th>
                  <th className="py-3 px-4 text-center w-12">V</th>
                  <th className="py-3 px-4 text-center w-12">E</th>
                  <th className="py-3 px-4 text-center w-12">D</th>
                  <th className="py-3 px-4 text-center w-12">SG</th>
                </tr>
              </thead>
              <tbody>
                {tabela.map((t, i) => {
                  // Definir cores para zonas de classificação
                  let rowClass = "";
                  if (i < 4) rowClass = "border-l-4 border-flash-blue";
                  else if (i < 6) rowClass = "border-l-4 border-flash-yellow";
                  else if (i > tabela.length - 5) rowClass = "border-l-4 border-flash-red";
                  
                  return (
                    <tr
                      key={i}
                      className={`border-t border-flash-border hover:bg-flash-hover transition ${rowClass}`}
                    >
                      <td className="py-3 px-4 font-semibold text-flash-text">{t.posicao}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs overflow-hidden">
                            <img
                              src={`/escudos/${t.nome.toLowerCase()}.png`}
                              alt={t.nome}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.parentNode.textContent = t.nome.charAt(0);
                              }}
                            />
                          </div>
                          <span className="font-medium text-flash-text">{t.nome}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-flash-text">{t.pontos}</td>
                      <td className="py-3 px-4 text-center text-flash-text-secondary">{t.jogos}</td>
                      <td className="py-3 px-4 text-center text-flash-text-secondary">{t.vitorias}</td>
                      <td className="py-3 px-4 text-center text-flash-text-secondary">{t.empates}</td>
                      <td className="py-3 px-4 text-center text-flash-text-secondary">{t.derrotas}</td>
                      <td className="py-3 px-4 text-center text-flash-text-secondary">{t.saldoGols}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="px-4 py-3 text-xs border-t border-flash-border">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="block w-3 h-3 bg-flash-blue"></span>
                <span className="text-flash-text-secondary">Champions League</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="block w-3 h-3 bg-flash-yellow"></span>
                <span className="text-flash-text-secondary">Europa League</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="block w-3 h-3 bg-flash-red"></span>
                <span className="text-flash-text-secondary">Rebaixamento</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
