// components/Layout.js
import Link from "next/link";
import { useState } from "react";

export default function Layout({ children }) {
  const [activeTab, setActiveTab] = useState("/");

  return (
    <div className="min-h-screen flex flex-col bg-flash-bg">
      {/* Header */}
      <header className="bg-flash-dark text-flash-text py-3 shadow-md sticky top-0 z-30">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-flash-yellow">⚽ Placar ao Vivo</h1>
          <nav className="hidden md:flex space-x-1 font-medium">
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-md transition-colors ${activeTab === "/" ? "bg-flash-yellow text-black" : "hover:bg-flash-hover"}`}
              onClick={() => setActiveTab("/")}
            >
              Início
            </Link>
            <Link 
              href="/jogos" 
              className={`px-4 py-2 rounded-md transition-colors ${activeTab === "/jogos" ? "bg-flash-yellow text-black" : "hover:bg-flash-hover"}`}
              onClick={() => setActiveTab("/jogos")}
            >
              Jogos
            </Link>
            <Link 
              href="/tabelas" 
              className={`px-4 py-2 rounded-md transition-colors ${activeTab === "/tabelas" ? "bg-flash-yellow text-black" : "hover:bg-flash-hover"}`}
              onClick={() => setActiveTab("/tabelas")}
            >
              Tabelas
            </Link>
            <Link 
              href="/artilharia" 
              className={`px-4 py-2 rounded-md transition-colors ${activeTab === "/artilharia" ? "bg-flash-yellow text-black" : "hover:bg-flash-hover"}`}
              onClick={() => setActiveTab("/artilharia")}
            >
              Artilharia
            </Link>
          </nav>
          
          {/* Menu mobile */}
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Barra de navegação secundária */}
      <div className="bg-flash-card text-flash-text py-2 border-b border-flash-border overflow-x-auto">
        <div className="container mx-auto px-4">
          <div className="flex space-x-4 text-sm font-medium">
            <button className="px-3 py-1 rounded-full bg-flash-red text-white flex items-center">
              <span className="animate-pulse-fast mr-1 h-2 w-2 rounded-full bg-white"></span>
              Ao Vivo
            </button>
            <button className="px-3 py-1 rounded-full hover:bg-flash-hover transition-colors">Hoje</button>
            <button className="px-3 py-1 rounded-full hover:bg-flash-hover transition-colors">Amanhã</button>
            <button className="px-3 py-1 rounded-full hover:bg-flash-hover transition-colors">Favoritos</button>
            <button className="px-3 py-1 rounded-full hover:bg-flash-hover transition-colors">Brasil</button>
            <button className="px-3 py-1 rounded-full hover:bg-flash-hover transition-colors">Europa</button>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <main className="flex-grow container mx-auto px-4 py-6 text-flash-text">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-flash-dark text-flash-text-secondary py-4 text-center text-sm">
        © {new Date().getFullYear()} Placar ao Vivo — Todos os direitos reservados.
      </footer>
    </div>
  );
}
