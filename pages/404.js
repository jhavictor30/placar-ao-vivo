export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-4 text-lg">Ops... Página não encontrada.</p>

      <a
        href="/"
        className="mt-6 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
      >
        Voltar para a Home
      </a>
    </div>
  );
}
