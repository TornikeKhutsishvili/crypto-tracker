import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'crypto/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => {
      return Promise.resolve([
        { id: 'bitcoin' },
        { id: 'ethereum' },
        { id: 'tether' },
        { id: 'xrp' },
        { id: 'bnb' },
        { id: 'solana' },
        { id: 'usdc' },
        { id: 'dogecoin' },
        { id: 'cardano' },
        { id: 'tron' },
        { id: 'lido stacked ether' },
        { id: 'wrapped bitcoin' },
        { id: 'sui' },
        { id: 'chainlink' },
        { id: 'avalanche' },
        { id: 'leo token' },
        { id: 'stellar' },
        { id: 'toncoin' },
        { id: 'shiba inu' },
        { id: 'hedera' }
      ]);
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
