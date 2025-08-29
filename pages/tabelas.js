// pages/tabelas.js
import { useEffect, useState } from "react";

export default function Tabelas() {
  const [tabela, setTabela] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscar tabela da API
  const fetchTabela = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/tabelas"); // rota da API que você vai criar
      const data = await res.json();
      setTabela(data.response[0]?.league?.standings[0] || []);
    } catch (error) {
      console.error("Erro ao carregar tabela:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTabela();
    const interval = setInterval(fetchTabela, 60000); // atualiza a cada 1 min
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-700 to-blue-800 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Classificação</h1>

      {loading ? (
        <p className="text-center">Carregando tabela...</p>
      ) : tabela.length === 0 ? (
        <p className="text-center">Nenhum dado disponível.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-2xl overflow-hidden shadow-lg">
            <thead className="bg-black/40">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2">P</th>
                <th className="px-4 py-2">V</th>
                <th className="px-4 py-2">E</th>
                <th className="px-4 py-2">D</th>
                <th className="px-4 py-2">SG</th>
              </tr>
            </thead>
            <tbody>
              {tabela.map((time, index) => (
                <tr
                  key={time.team.id}
                  className={`${
                    index === 0
                      ? "bg-yellow-500 text-black font-bold"
                      : "bg-gray-800"
                  } border-b border-gray-700`}
                >
                  <td className="px-4 py-2">{time.rank}</td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <img
                      src={time.team.logo}
                      alt={time.team.name}
                      className="w-6 h-6"
                    />
                    {time.team.name}
                  </td>
                  <td className="px-4 py-2 text-center">{time.points}</td>
                  <td className="px-4 py-2 text-center">{time.all.win}</td>
                  <td className="px-4 py-2 text-center">{time.all.draw}</td>
                  <td className="px-4 py-2 text-center">{time.all.lose}</td>
                  <td className="px-4 py-2 text-center">{time.goalsDiff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
