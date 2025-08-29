// pages/api/jogos.js

export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.football-data.org/v4/matches", {
      headers: {
        "X-Auth-Token": process.env.FOOTBALL_DATA_KEY, // ✅ usando a variável que você já tem
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Erro ao buscar dados da API" });
    }

    const data = await response.json();

    // Organizar os jogos de forma simples
    const jogos = data.matches.map((match) => ({
      id: match.id,
      status:
        match.status === "LIVE"
          ? "ao vivo"
          : match.status === "FINISHED"
          ? "encerrado"
          : "próximo",
      timeCasa: match.homeTeam?.name,
      timeFora: match.awayTeam?.name,
      placarCasa: match.score?.fullTime?.home ?? 0,
      placarFora: match.score?.fullTime?.away ?? 0,
      horario: match.utcDate,
      campeonato: match.competition?.name,
    }));

    res.status(200).json({ jogos });
  } catch (error) {
    console.error("Erro na API de jogos:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}
