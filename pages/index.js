// pages/index.js
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [destaques, setDestaques] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscar jogos da API interna
  useEffect(() => {
    const fetchDestaques = async () => {
      try {
        const res = await fetch("/api/jogos");
        const data = await res.json();

        if (data.jogos) {
          // Pegar apenas alguns jogos ao vivo ou próximos
          const jogosFiltrados = data.jogos.filter(
            (j) => j.status === "ao vivo" || j.status === "próximo"
          );
          setDestaques(jogosFiltrados.slice(0, 5)); // mostra só os 5 primeiros
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
    <div className="min-h-screen bg-gradient-to-b from-green-600 to-blue-600 text-white p-6">
      {/* Cabeçalho */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">⚽ Futebol Live</h1>
        <Link href="/jogos">
          <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold shadow-md hover:bg-yellow-400 transition">
            Ver jogos agora
          </button>
        </Link>
      </header>

      {/* Título principal */}
      <h2 className="text-4xl font-extrabold text-center mb-6">
        O melhor placar de futebol ao vivo
      </h2>
      <p className="text-center text-lg mb-10">
        Acompanhe partidas em tempo real, estatísticas essenciais e os principais campeonatos.
      </p>

      {/* Destaques */}
      <section>
        <h3 className="text-2xl font-bold mb-4">Destaques de hoje</h3>

        {loading ? (
          <p>Carregando jogos...</p>
        ) : destaques.length === 0 ? (
          <p>Nenhuma partida em destaque agora.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {destaques.map((jogo) => (
              <div
                key={jogo.id}
                className="bg-white text-black rounded-xl p-4 shadow-lg"
              >
                <h4 className="font-bold text-lg mb-2">{jogo.campeonato}</h4>
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
      </section>

      {/* Rodapé */}
      <footer className="mt-12 border-t border-white/20 pt-6 text-center text-sm text-white/70">
        © {new Date().getFullYear()} Futebol Live — Todos os direitos reservados.
      </footer>
    </div>
  );
}
