// pages/index.js
import { useEffect, useMemo, useState } from "react";

/* === Utilitários iguais aos do /jogos para manter consistência === */
const LIVE_CODES = new Set(["1H", "2H", "ET", "BT", "LIVE", "P"]);
const FINISHED_CODES = new Set(["FT", "AET", "PEN"]);
const NOT_STARTED = "NS";

const isLive = (code) => LIVE_CODES.has(code);
const isFinished = (code) => FINISHED_CODES.has(code);
const isNotStarted = (code) => code === NOT_STARTED;

function formatKickoff(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "—";
  }
}

function statusStyle(short, long) {
  if (isLive(short)) {
    return {
      label: long || "Ao vivo",
      className:
        "bg-green-600/90 text-white px-2 py-0.5 rounded-full text-xs font-bold animate-pulse",
    };
  }
  if (isFinished(short)) {
    return {
      label: long || "Encerrado",
      className:
        "bg-gray-700/80 text-gray-100 px-2 py-0.5 rounded-full text-xs font-semibold",
    };
  }
  if (isNotStarted(short)) {
    return {
      label: "Não iniciado",
      className:
        "bg-blue-600/90 text-white px-2 py-0.5 rounded-full text-xs font-semibold",
    };
  }
  return {
    label: long || short || "—",
    className:
      "bg-yellow-600/90 text-white px-2 py-0.5 rounded-full text-xs font-semibold",
  };
}

function progressPercent(short, elapsed) {
  if (!isLive(short)) return 0;
  const e = typeof elapsed === "number" ? elapsed : 0;
  const denom = e > 90 ? 120 : 90;
  return Math.max(5, Math.min(100, Math.round((e / denom) * 100)));
}

/* === Página Inicial === */
export default function Home() {
  const [data, setData] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  // carrega uma vez e auto-refresh a cada 30s
  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setErro("");
        const res = await fetch("/api/live", { cache: "no-store" });
        const json = await res.json();
        if (!alive) return;

        if (!res.ok) {
          setErro(json?.error || "Erro ao carregar jogos.");
          setData([]);
        } else {
          const arr = Array.isArray(json?.response) ? json.response : [];
          setData(arr);
          setLastUpdated(new Date());
        }
      } catch (e) {
        if (alive) {
          setErro("Falha ao buscar jogos.");
          setData([]);
        }
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    const id = setInterval(load, 30000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  // contadores
  const counts = useMemo(() => {
    let live = 0,
      ns = 0,
      fin = 0;
    for (const m of data) {
      const s = m?.fixture?.status?.short || "";
      if (isLive(s)) live++;
      else if (isNotStarted(s)) ns++;
      else if (isFinished(s)) fin++;
    }
    return { live, ns, fin, total: data.length };
  }, [data]);

  // destaques: prioriza ao vivo; se não tiver, pega primeiros da lista
  const destaques = useMemo(() => {
    const live = data.filter((m) => isLive(m?.fixture?.status?.short));
    const rest = data.filter((m) => !isLive(m?.fixture?.status?.short));
    return [...live, ...rest].slice(0, 6);
  }, [data]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-blue-600 to-indigo-700">
      {/* Navbar */}
      <header className="sticky top-0 z-20 backdrop-blur bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">⚽</span>
            <span className="text-white font-extrabold text-lg tracking-wide">
              Futebol Live
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            <a href="/jogos" className="text-white/90 hover:text-white font-medium">
              Jogos ao vivo
            </a>
            <a href="#" className="text-white/70 hover:text-white">
              Tabelas
            </a>
            <a href="#" className="text-white/70 hover:text-white">
              Notícias
            </a>
            <a href="#" className="text-white/70 hover:text-white">
              Sobre
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/jogos"
              className="px-4 py-2 rounded-xl bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-300 transition shadow"
            >
              Ver jogos agora
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 pt-10 pb-6">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow">
            O melhor placar de futebol ao vivo
          </h1>
          <p className="mt-3 text-white/90 max-w-2xl mx-auto">
            Acompanhe partidas em tempo real, estatísticas essenciais e os principais campeonatos.
          </p>

          {/* Chips de atalhos */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <a
              href="/jogos"
              className="px-3 py-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 text-sm font-semibold"
            >
              Ao vivo ({counts.live})
            </a>
            <a
              href="/jogos"
              className="px-3 py-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 text-sm"
            >
              Próximos ({counts.ns})
            </a>
            <a
              href="/jogos"
              className="px-3 py-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 text-sm"
            >
              Encerrados ({counts.fin})
            </a>
            <a
              href="/jogos"
              className="px-3 py-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 text-sm"
            >
              Todos ({counts.total})
            </a>
          </div>

          {/* Linha de status */}
          <div className="mt-4 text-white/90 text-sm flex items-center justify-center gap-3">
            {loading ? <span>Atualizando…</span> : <span>Atualizado</span>}
            {lastUpdated ? <span>• {lastUpdated.toLocaleTimeString()}</span> : null}
            {erro ? (
              <span className="bg-red-600/90 px-2 py-1 rounded-lg">{erro}</span>
            ) : null}
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <h2 className="text-white text-2xl font-extrabold mb-4">Destaques de hoje</h2>

        {loading && data.length === 0 ? (
          <div className="text-white/90">Carregando…</div>
        ) : destaques.length === 0 ? (
          <div className="text-white/90">Nenhuma partida para exibir agora.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {destaques.map((m) => {
              const id = m?.fixture?.id;
              const league = m?.league || {};
              const home = m?.teams?.home || {};
              const away = m?.teams?.away || {};
              const goals = m?.goals || {};
              const status = m?.fixture?.status || {};
              const minute = status?.elapsed;
              const short = status?.short;
              const long = status?.long;
              const round = league?.round;
              const progress = progressPercent(short, minute);
              const s = statusStyle(short, long);
              const isNS = isNotStarted(short);
              const isLV = isLive(short);

              return (
                <div
                  key={id}
                  className="bg-white/95 rounded-2xl shadow-xl border border-white/40 overflow-hidden hover:shadow-2xl hover:-translate-y-0.5 transition"
                >
                  {/* Cabeçalho liga */}
                  <div className="flex items-center justify-between px-4 py-3 bg-black/5">
                    <div className="flex items-center gap-2 min-w-0">
                      {league.flag ? (
                        <img
                          src={league.flag}
                          alt={league.country || "flag"}
                          className="w-5 h-5 rounded-full"
                        />
                      ) : league.logo ? (
                        <img
                          src={league.logo}
                          alt={league.name || "league"}
                          className="w-5 h-5 rounded-sm"
                        />
                      ) : null}
                      <div className="truncate">
                        <div className="text-sm font-semibold text-gray-900 truncate">
                          {league.name || "—"}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {round ? round : league.country || ""}
                        </div>
                      </div>
                    </div>

                    <span className={s.className} title={long}>
                      {s.label}
                    </span>
                  </div>

                  {/* Corpo */}
                  <div className="px-4 py-4">
                    <div className="flex items-center justify-between gap-3">
                      {/* Casa */}
                      <div className="flex items-center gap-2 min-w-0">
                        {home.logo ? (
                          <img
                            src={home.logo}
                            alt={home.name}
                            className="w-8 h-8 rounded-full bg-white"
                          />
                        ) : null}
                        <span className="font-medium text-gray-800 truncate">
                          {home.name}
                        </span>
                      </div>

                      {/* Placar */}
                      <div
                        className={`text-3xl font-extrabold text-center ${
                          isLV ? "text-green-600" : isNS ? "text-blue-700" : "text-gray-900"
                        }`}
                        style={{ minWidth: 90 }}
                        title={isLV ? `${minute || 0}'` : long}
                      >
                        {typeof goals.home === "number" ? goals.home : 0}{" "}
                        <span className="text-gray-400">-</span>{" "}
                        {typeof goals.away === "number" ? goals.away : 0}
                      </div>

                      {/* Visitante */}
                      <div className="flex items-center gap-2 justify-end min-w-0">
                        <span className="font-medium text-gray-800 truncate text-right">
                          {away.name}
                        </span>
                        {away.logo ? (
                          <img
                            src={away.logo}
                            alt={away.name}
                            className="w-8 h-8 rounded-full bg-white"
                          />
                        ) : null}
                      </div>
                    </div>

                    {/* Info + horário */}
                    <div className="mt-3 flex items-center justify-between text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        {m.fixture?.venue?.name ? (
                          <span>🏟️ {m.fixture.venue.name}</span>
                        ) : null}
                      </div>
                      <div className="text-right">
                        {isLV ? (
                          <span className="font-semibold text-green-700">
                            ⏱ {typeof minute === "number" ? `${minute}'` : "—"}
                          </span>
                        ) : isNS ? (
                          <span className="font-semibold text-blue-700">
                            ⏰ {formatKickoff(m.fixture?.date)}
                          </span>
                        ) : (
                          <span className="text-gray-700">{long}</span>
                        )}
                      </div>
                    </div>

                    {/* Progresso (ao vivo) */}
                    {isLV ? (
                      <div className="mt-3">
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-2 bg-green-500 transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="mt-1 text-[10px] text-gray-500 flex justify-between">
                          <span>0'</span>
                          <span>45'</span>
                          <span>90'+</span>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {/* Rodapé do card */}
                  <div className="px-4 py-3 bg-black/5 flex items-center justify-between">
                    <a
                      href="/jogos"
                      className="text-sm font-semibold text-blue-700 hover:underline"
                    >
                      Ver detalhes e mais jogos →
                    </a>
                    <a
                      href="/jogos"
                      className="text-sm text-gray-600 hover:text-gray-800"
                    >
                      Estatísticas em breve
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Rodapé */}
      <footer className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 py-6 text-white/80 text-sm flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Futebol Live — Todos os direitos reservados.</div>
          <div className="flex items-center gap-4">
            <a href="/jogos" className="hover:text-white">Jogos</a>
            <a href="#" className="hover:text-white">Termos</a>
            <a href="#" className="hover:text-white">Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
