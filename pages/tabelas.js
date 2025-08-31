// pages/tabela.js
import { useEffect, useState } from "react";

export default function Tabela() {
  const [tabela, setTabela] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTabela = async () => {
      try {
        const res = await fetch("/api/tabela");
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
    <div className="max-w-4xl mx-auto py-6 px-4">
      <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
        Tabela do Campeonato
      </h2>

      {loading ? (
        <p>Carregando tabela...</p>
      ) : tabela.length === 0 ? (
        <p>Nenhum dado disponível.</p>
      ) : (
        <table className="w-full text-sm border border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-[#111] text-gray-300">
            <tr>
              <th className="py-2 px-2 text-left">#</th>
              <th className="py-2 px-2 text-left">Time</th>
              <th className="py-2 px-2">P</th>
              <th className="py-2 px-2">J</th>
              <th className="py-2 px-2">V</th>
              <th className="py-2 px-2">E</th>
              <th className="py-2 px-2">D</th>
              <th className="py-2 px-2">SG</th>
            </tr>
          </thead>
          <tbody>
            {tabela.map((t, i) => (
              <tr
                key={i}
                className="border-t border-gray-700 hover:bg-[#2a2a2a] transition"
              >
                <td className="py-2 px-2 font-semibold">{t.posicao}</td>
                <td className="py-2 px-2 flex items-center gap-2">
                  <img
                    src={`/escudos/${t.nome.toLowerCase()}.png`}
                    alt={t.nome}
                    className="w-5 h-5 object-contain"
                  />
                  {t.nome}
                </td>
                <td className="py-2 px-2 text-center">{t.pontos}</td>
                <td className="py-2 px-2 text-center">{t.jogos}</td>
                <td className="py-2 px-2 text-center">{t.vitorias}</td>
                <td className="py-2 px-2 text-center">{t.empates}</td>
                <td className="py-2 px-2 text-center">{t.derrotas}</td>
                <td className="py-2 px-2 text-center">{t.saldoGols}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
