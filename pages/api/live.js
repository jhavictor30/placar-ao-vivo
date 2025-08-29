// pages/api/live.js

export default async function handler(req, res) {
  const apiKey = process.env.NEXT_PUBLIC_APISPORTS_KEY; // pega chave do .env.local

  if (!apiKey) {
    return res.status(500).json({ error: 'API Key não configurada no .env.local' });
  }

  try {
    // Primeiro tenta buscar jogos ao vivo
    let url = "https://v3.football.api-sports.io/fixtures?live=all";

    let response = await fetch(url, {
      method: "GET",
      headers: {
        "x-apisports-key": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar dados da API");
    }

    let data = await response.json();

    // Se não houver jogos ao vivo, busca próximos jogos do dia
    if (!data.response || data.response.length === 0) {
      const today = new Date().toISOString().split("T")[0]; // pega data atual YYYY-MM-DD
      url = `https://v3.football.api-sports.io/fixtures?date=${today}`;

      response = await fetch(url, {
        method: "GET",
        headers: {
          "x-apisports-key": apiKey,
        },
      });

      data = await response.json();
    }

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
