# Configuração do Google AdSense no Placar ao Vivo

Este guia explica como configurar o Google AdSense no seu site Placar ao Vivo para começar a monetizar o tráfego.

## Passo 1: Criar uma conta no Google AdSense

1. Acesse [Google AdSense](https://www.google.com/adsense/)
2. Clique em "Começar" e siga as instruções para criar uma conta
3. Forneça as informações do seu site e detalhes de pagamento
4. Aguarde a aprovação do Google (pode levar alguns dias)

## Passo 2: Configurar as variáveis de ambiente

1. Crie um arquivo `.env.local` na raiz do projeto (você pode copiar o arquivo `.env.local.example`)
2. Adicione seu ID de publicador do AdSense:

```
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
```

Substitua `XXXXXXXXXXXXXXXX` pelo seu ID de publicador real fornecido pelo Google AdSense.

## Passo 3: Verificar a integração

O código necessário para o AdSense já está configurado no arquivo `_document.js`. Após a aprovação da sua conta:

1. Faça deploy do site com as alterações
2. Verifique no painel do AdSense se o site está sendo rastreado corretamente
3. Aguarde até que o Google comece a exibir anúncios

## Passo 4: Adicionar anúncios em locais específicos

Use o componente `AdSense.js` para adicionar anúncios em locais específicos do seu site:

```jsx
import AdSense from '../components/AdSense';

// Na sua página ou componente
<AdSense 
  slot="1234567890" // Substitua pelo slot do seu anúncio
  format="auto"
  responsive="true"
/>
```

### Parâmetros do componente AdSense:

- `slot`: O ID do slot do anúncio (obrigatório, fornecido pelo AdSense)
- `format`: Formato do anúncio (padrão: "auto")
- `responsive`: Se o anúncio deve ser responsivo (padrão: "true")
- `layout`: Layout específico do anúncio (opcional)

## Exemplos de implementação

Veja exemplos de como implementar anúncios em diferentes formatos no arquivo `examples/AdSenseExample.js`.

## Dicas importantes

1. **Não clique nos seus próprios anúncios** - isso viola os termos de serviço do AdSense
2. **Limite o número de anúncios** - muitos anúncios podem prejudicar a experiência do usuário
3. **Teste em diferentes dispositivos** - certifique-se de que os anúncios são exibidos corretamente em todos os tamanhos de tela
4. **Monitore o desempenho** - use o painel do AdSense para acompanhar o desempenho dos seus anúncios

## Solução de problemas

Se os anúncios não estiverem aparecendo:

1. Verifique se sua conta foi aprovada pelo Google
2. Confirme se o ID do publicador está correto no arquivo `.env.local`
3. Verifique o console do navegador para erros
4. Certifique-se de que não há bloqueadores de anúncios ativos durante os testes