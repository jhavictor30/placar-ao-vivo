// pages/api/jogos.js
export default async function handler(req, res) {
  try {
    const response = await fetch("https://v3.football.api-sports.io/fixtures?live=all", {
      headers: {
        "x-apisports-key": process.env.API_FOOTBALL_KEY, // sua chave do .env.local
      },
    });

    const data = await response.json();

    const jogos = data.response.map((item) => ({
      campeonato: item.league.name,
      home: item.teams.home.name,
      away: item.teams.away.name,
      homeLogo: item.teams.home.logo,
      awayLogo: item.teams.away.logo,
      placar: `${item.goals.home} x ${item.goals.away}`,
      status:
        item.fixture.status.short === "1H" ||
        item.fixture.status.short === "2H" ||
        item.fixture.status.short === "LIVE"
          ? "ao vivo"
          : item.fixture.status.short === "NS"
          ? "próximo"
          : item.fixture.status.short === "FT"
          ? "encerrado"
          : "outro",
      estadio: item.fixture.venue?.name || "Estádio não informado",
      data: new Date(item.fixture.date).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      statistics: item.statistics || [],
    }));

    res.status(200).json(jogos);
  } catch (error) {
    console.error("Erro API:", error);
    res.status(500).json({ error: "Erro ao buscar dados da API-Football" });
  }
}
