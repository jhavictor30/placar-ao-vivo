import { useEffect } from 'react';
import Script from 'next/script';

// Componente para exibir anúncios do Google AdSense em locais específicos
export default function AdSense({ slot, format = 'auto', responsive = 'true', layout = '' }) {
  useEffect(() => {
    // Tenta inicializar o anúncio quando o componente é montado
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (err) {
      console.error('Erro ao carregar anúncio:', err);
    }
  }, []);

  return (
    <>
      {/* Anúncio do Google AdSense */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7516070264132194" // ID do publicador do AdSense
        data-ad-slot={slot} // Slot específico do anúncio definido no AdSense
        data-ad-format={format}
        data-full-width-responsive={responsive}
        {...(layout && { 'data-ad-layout': layout })}
      />
    </>
  );
}