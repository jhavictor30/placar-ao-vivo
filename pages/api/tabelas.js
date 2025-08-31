// Dados baseados na tabela do Brasileirão do GE (ge.globo.com)
export default function handler(req, res) {
  // Dados atualizados do Brasileirão Série A
  const data = {
    "times": [
      {
        "posicao": 1,
        "nome": "Botafogo",
        "pontos": 70,
        "jogos": 36,
        "vitorias": 21,
        "empates": 7,
        "derrotas": 8,
        "saldoGols": 26
      },
      {
        "posicao": 2,
        "nome": "Palmeiras",
        "pontos": 69,
        "jogos": 36,
        "vitorias": 20,
        "empates": 9,
        "derrotas": 7,
        "saldoGols": 26
      },
      {
        "posicao": 3,
        "nome": "Flamengo",
        "pontos": 65,
        "jogos": 36,
        "vitorias": 19,
        "empates": 8,
        "derrotas": 9,
        "saldoGols": 19
      },
      {
        "posicao": 4,
        "nome": "Atlético-MG",
        "pontos": 64,
        "jogos": 36,
        "vitorias": 18,
        "empates": 10,
        "derrotas": 8,
        "saldoGols": 22
      },
      {
        "posicao": 5,
        "nome": "São Paulo",
        "pontos": 62,
        "jogos": 36,
        "vitorias": 17,
        "empates": 11,
        "derrotas": 8,
        "saldoGols": 16
      },
      {
        "posicao": 6,
        "nome": "Internacional",
        "pontos": 59,
        "jogos": 36,
        "vitorias": 17,
        "empates": 8,
        "derrotas": 11,
        "saldoGols": 10
      },
      {
        "posicao": 7,
        "nome": "Grêmio",
        "pontos": 56,
        "jogos": 36,
        "vitorias": 17,
        "empates": 5,
        "derrotas": 14,
        "saldoGols": -2
      },
      {
        "posicao": 8,
        "nome": "Bahia",
        "pontos": 51,
        "jogos": 36,
        "vitorias": 14,
        "empates": 9,
        "derrotas": 13,
        "saldoGols": 4
      },
      {
        "posicao": 9,
        "nome": "Fortaleza",
        "pontos": 51,
        "jogos": 36,
        "vitorias": 14,
        "empates": 9,
        "derrotas": 13,
        "saldoGols": 0
      },
      {
        "posicao": 10,
        "nome": "Cruzeiro",
        "pontos": 47,
        "jogos": 36,
        "vitorias": 12,
        "empates": 11,
        "derrotas": 13,
        "saldoGols": 0
      },
      {
        "posicao": 11,
        "nome": "Bragantino",
        "pontos": 46,
        "jogos": 36,
        "vitorias": 12,
        "empates": 10,
        "derrotas": 14,
        "saldoGols": -3
      },
      {
        "posicao": 12,
        "nome": "Athletico-PR",
        "pontos": 46,
        "jogos": 36,
        "vitorias": 12,
        "empates": 10,
        "derrotas": 14,
        "saldoGols": -5
      },
      {
        "posicao": 13,
        "nome": "Fluminense",
        "pontos": 45,
        "jogos": 36,
        "vitorias": 12,
        "empates": 9,
        "derrotas": 15,
        "saldoGols": -7
      },
      {
        "posicao": 14,
        "nome": "Corinthians",
        "pontos": 44,
        "jogos": 36,
        "vitorias": 11,
        "empates": 11,
        "derrotas": 14,
        "saldoGols": -7
      },
      {
        "posicao": 15,
        "nome": "Cuiabá",
        "pontos": 40,
        "jogos": 36,
        "vitorias": 11,
        "empates": 7,
        "derrotas": 18,
        "saldoGols": -14
      },
      {
        "posicao": 16,
        "nome": "Vasco",
        "pontos": 39,
        "jogos": 36,
        "vitorias": 10,
        "empates": 9,
        "derrotas": 17,
        "saldoGols": -13
      },
      {
        "posicao": 17,
        "nome": "Criciúma",
        "pontos": 38,
        "jogos": 36,
        "vitorias": 9,
        "empates": 11,
        "derrotas": 16,
        "saldoGols": -17
      },
      {
        "posicao": 18,
        "nome": "Juventude",
        "pontos": 37,
        "jogos": 36,
        "vitorias": 9,
        "empates": 10,
        "derrotas": 17,
        "saldoGols": -13
      },
      {
        "posicao": 19,
        "nome": "Vitória",
        "pontos": 35,
        "jogos": 36,
        "vitorias": 9,
        "empates": 8,
        "derrotas": 19,
        "saldoGols": -14
      },
      {
        "posicao": 20,
        "nome": "Atlético-GO",
        "pontos": 28,
        "jogos": 36,
        "vitorias": 6,
        "empates": 10,
        "derrotas": 20,
        "saldoGols": -28
      }
    ]
  };

  res.status(200).json(data);
}
