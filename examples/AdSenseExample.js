import AdSense from '../components/AdSense';

// Este é um exemplo de como usar o componente AdSense em suas páginas
export default function AdSenseExample() {
  return (
    <div className="my-8">
      <h2 className="text-xl font-bold mb-4">Exemplo de Implementação de Anúncios</h2>
      
      {/* Exemplo de anúncio no topo da página */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Anúncio no Topo</h3>
        <AdSense 
          slot="1234567890" // Substitua pelo slot do seu anúncio
          format="auto"
          responsive="true"
        />
      </div>
      
      {/* Exemplo de anúncio em formato retangular */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Anúncio Retangular</h3>
        <AdSense 
          slot="0987654321" // Substitua pelo slot do seu anúncio
          format="rectangle"
          responsive="false"
        />
      </div>
      
      {/* Exemplo de anúncio com layout específico */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Anúncio com Layout In-article</h3>
        <AdSense 
          slot="1122334455" // Substitua pelo slot do seu anúncio
          format="fluid"
          responsive="true"
          layout="in-article"
        />
      </div>
    </div>
  );
}