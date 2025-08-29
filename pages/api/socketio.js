// pages/api/socketio.js
import { Server } from "socket.io";

let io;                 // singleton do socket
let cache = { ts: Date.now(), jogos: [], counts: { live: 0, next: 0, done: 0, all: 0 } };
let timer;              // intervalo de polling
const INTERVAL_MS = 15000; // 15s

// mapeia status curto da API-Sports para nossos rótulos
function mapStatus(short) {
  const s = String(short || "").toUpperCase();
  const liveSet = new Set(["1H","2H","ET","BT","LIVE","P","P1","P2","INT"]);
  const doneSet = new Set(["FT","AET","PEN","AWD","WO","ABD","SUSP","PST"]);
  if (s === "NS" || s === "") return "proximo";
  if (liveSet.has(s)) return "ao vivo";
  if (doneSet.has(s)) return "encerrado";
  return "encerrado";
}

async function fetchLiveFromApi() {
  try {
    const key = process.env.APISPORTS_KEY;
    if (!key) throw new Error("APISPORTS_KEY ausente no .env.local");

    // buscamos TUDO que está ao vivo + próximos nas próximas horas (ajuste se quiser)
    const urls = [
      "https://v3.football.api-sports.io/fixtures?live=all",
      // próximos 12h
      `https://v3.football.api-sports.io/fixtures?from=${new Date().toISOString().slice(0,10)}&to=${new Date(Date.now()+12*3600*1000).toISOString().slice(0,10)}`
    ];

    const headers = { "x-apisports-key": key };
    const all = [];

    for (const u of urls) {
      const res = await fetch(u, { headers, method: "GET" });
      if (!res.ok) throw new Error(`API ${res.status} ao buscar ${u}`);
      const json = await res.json();
      if (json?.response?.length) all.push(...json.response);
    }

    // normaliza
    const jogos = all.map((fx) => ({
      id: fx.fixture?.id,
      campeonato: fx.league?.name,
      pais: fx.league?.country,
      rodada: fx.league?.round,
      dataISO: fx.fixture?.date,
      estadio: fx.fixture?.venue?.name || "",
      statusShort: fx.fixture?.status?.short,
      status: mapStatus(fx.fixture?.status?.short),
      minuto: fx.fixture?.status?.elapsed ?? null,

      home: {
        id: fx.teams?.home?.id,
        name: fx.teams?.home?.name,
        logo: fx.teams?.home?.logo
      },
      away: {
        id: fx.teams?.away?.id,
        name: fx.teams?.away?.name,
        logo: fx.teams?.away?.logo
      },
      gols: {
        home: fx.goals?.home ?? 0,
        away: fx.goals?.away ?? 0
      }
    }));

    // dedup por id
    const seen = new Set();
    const dedup = jogos.filter(j => j.id && !seen.has(j.id) && seen.add(j.id));

    const counts = {
      live: dedup.filter(j => j.status === "ao vivo").length,
      next: dedup.filter(j => j.status === "proximo").length,
      done: dedup.filter(j => j.status === "encerrado").length,
      all: dedup.length
    };

    cache = { ts: Date.now(), jogos: dedup, counts };
    if (io) io.emit("jogos:update", cache); // empurra para todos
  } catch (err) {
    console.error("[socketio] erro no fetch:", err.message);
    if (io) io.emit("jogos:error", { message: err.message });
  }
}

export default function handler(req, res) {
  if (!res.socket.server.io) {
    io = new Server(res.socket.server, {
      path: "/api/socketio",
      addTrailingSlash: false,
      cors: { origin: "*" }
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      // entrega o último cache na entrada
      socket.emit("jogos:update", cache);
    });

    // inicia polling se ainda não estiver rodando
    fetchLiveFromApi();
    timer = setInterval(fetchLiveFromApi, INTERVAL_MS);
    console.log("[socketio] servidor iniciado");
  }

  res.end(); // necessário para a rota API do Next
}

// Para hot-reload do Next: limpa o intervalo ao matar a página
export const config = {
  api: { bodyParser: false }
};
