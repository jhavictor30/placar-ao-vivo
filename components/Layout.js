// components/Layout.js
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold">⚽ Futebol Live</h1>
          <nav className="space-x-6 font-semibold">
            <Link href="/">Início</Link>
            <Link href="/jogos">Jogos</Link>
            <Link href="/tabelas">Tabelas</Link>
          </nav>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-grow container mx-auto px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4 mt-8 text-center">
        © {new Date().getFullYear()} Futebol Live — Todos os direitos reservados.
      </footer>
    </div>
  );
}
