// pages/api/tabelas.js

export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://v3.football.api-sports.io/standings?league=71&season=2025", // Troque o league e season se quiser outra competição
      {
        method: "GET",
        headers: {
          "x-apisports-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );

    const data = await response.json();

    if (!data || data.errors) {
      return res.status(400).json({ error: "Erro ao buscar dados da API" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro API:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}
