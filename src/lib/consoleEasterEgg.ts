import type { Rank } from '../types/match';

interface EasterEggData {
  rankAtual: Rank;
  divisaoAtual?: number;
  lpAtual: number;
  winRatePct: number;
  totalPartidas: number;
}

// Mensagem estilizada impressa no console do navegador — pequeno easter egg
// pra quem abrir o DevTools por curiosidade. Usa a mesma paleta do site.
export function printConsoleEasterEgg(data: EasterEggData) {
  const brand = 'color:#5B67F1;font-weight:700;';
  const diamond = 'color:#45C6E8;font-weight:700;';
  const dim = 'color:#8B93A7;font-weight:400;';
  const reset = 'color:inherit;font-weight:400;';

  console.log('%c◆ Do Ban ao Diamante', `font-size:22px;${brand}`);
  console.log('%cCuriosidade sempre paga, né? Bem-vindo ao console.', `font-size:13px;${dim}`);
  console.log('');
  console.log(
    `%cElo atual:%c ${data.rankAtual}${data.divisaoAtual ? ` ${data.divisaoAtual}` : ''} (${data.lpAtual} LP)`,
    `font-size:12px;${dim}`,
    `font-size:12px;${diamond}`,
  );
  console.log(
    `%cWin rate:%c ${data.winRatePct.toFixed(1)}%   %cPartidas:%c ${data.totalPartidas}`,
    `font-size:12px;${dim}`,
    `font-size:12px;${reset}`,
    `font-size:12px;${dim}`,
    `font-size:12px;${reset}`,
  );
  console.log('');
  console.log(
    '%cSe você também tá de olho no F12, bora trocar ideia sobre o projeto.',
    `font-size:11px;${dim}`,
  );
}