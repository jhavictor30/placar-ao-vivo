/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'flash': {
          'dark': '#0e0e0e',      // Cor de fundo principal escura
          'bg': '#1e1e1e',        // Cor de fundo secundária
          'card': '#252525',      // Cor para cards e elementos
          'hover': '#2a2a2a',     // Cor para hover
          'border': '#333333',    // Cor para bordas
          'yellow': '#FFDD00',    // Amarelo principal (como no Flashscore)
          'red': '#e53e3e',       // Vermelho para ao vivo
          'green': '#38a169',     // Verde para vitórias
          'blue': '#3182ce',      // Azul para links
          'text': '#f7fafc',      // Texto principal
          'text-secondary': '#a0aec0', // Texto secundário
        },
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in': 'slideIn 0.2s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
