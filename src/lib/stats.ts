import type { Match, Rank, Lane } from '../types/match';

export const RANK_ORDER: Rank[] = [
  'Ferro', 'Bronze', 'Prata', 'Ouro', 'Platina', 'Esmeralda',
  'Diamante', 'Mestre', 'Grão-Mestre', 'Desafiante',
];

export function kda(m: Pick<Match, 'kills' | 'deaths' | 'assists'>): number {
  if (m.deaths === 0) return m.kills + m.assists;
  return (m.kills + m.assists) / m.deaths;
}

export function avgKda(list: Match[]): number {
  if (!list.length) return 0;
  const totalK = list.reduce((s, m) => s + m.kills, 0);
  const totalD = list.reduce((s, m) => s + m.deaths, 0);
  const totalA = list.reduce((s, m) => s + m.assists, 0);
  return totalD === 0 ? totalK + totalA : (totalK + totalA) / totalD;
}

export function winRate(list: Match[]): number {
  if (!list.length) return 0;
  const wins = list.filter((m) => m.resultado === 'vitoria').length;
  return (wins / list.length) * 100;
}

export function currentStreak(list: Match[]): { type: 'vitoria' | 'derrota' | null; count: number } {
  if (!list.length) return { type: null, count: 0 };
  const sorted = [...list].sort((a, b) => a.data.localeCompare(b.data));
  const last = sorted[sorted.length - 1].resultado;
  let count = 0;
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].resultado === last) count++;
    else break;
  }
  return { type: last, count };
}

export function bestStreak(list: Match[], type: 'vitoria' | 'derrota'): number {
  const sorted = [...list].sort((a, b) => a.data.localeCompare(b.data));
  let best = 0;
  let cur = 0;
  for (const m of sorted) {
    if (m.resultado === type) {
      cur++;
      best = Math.max(best, cur);
    } else cur = 0;
  }
  return best;
}

export interface ChampionAgg {
  campeao: string;
  partidas: number;
  vitorias: number;
  winRate: number;
  kdaMedio: number;
}

export function championStats(list: Match[]): ChampionAgg[] {
  const map = new Map<string, Match[]>();
  for (const m of list) {
    const arr = map.get(m.campeao) ?? [];
    arr.push(m);
    map.set(m.campeao, arr);
  }
  return Array.from(map.entries())
    .map(([campeao, matches]) => ({
      campeao,
      partidas: matches.length,
      vitorias: matches.filter((m) => m.resultado === 'vitoria').length,
      winRate: winRate(matches),
      kdaMedio: avgKda(matches),
    }))
    .sort((a, b) => b.partidas - a.partidas);
}

export function mostPlayedChampion(list: Match[]): ChampionAgg | undefined {
  return championStats(list)[0];
}

export function bestChampion(list: Match[]): ChampionAgg | undefined {
  const champs = championStats(list).filter((c) => c.partidas >= 2);
  if (!champs.length) return championStats(list)[0];
  return [...champs].sort((a, b) => b.winRate - a.winRate)[0];
}

// Elos que têm divisão (IV a I). A partir de Mestre não existe mais divisão,
// o ranqueamento passa a ser só por LP.
const DIVISIONED_RANKS = new Set<Rank>([
  'Ferro', 'Bronze', 'Prata', 'Ouro', 'Platina', 'Esmeralda', 'Diamante',
]);

// Converte elo + divisão + LP numa régua contínua, pra dar pra comparar
// duas posições (início da jornada vs agora vs objetivo) de forma justa.
// Cada elo vale 4 unidades (uma por divisão); dentro da divisão, o LP
// (0 a 100) preenche a unidade proporcionalmente.
function tierValue(rank: Rank, divisao: number | undefined, lp: number): number {
  const idx = RANK_ORDER.indexOf(rank);
  const clampedLp = Math.max(0, Math.min(100, lp));
  if (!DIVISIONED_RANKS.has(rank)) {
    // Mestre+ : sem divisão, aproxima só pelo LP acumulado ali dentro.
    return idx * 4 + Math.min(clampedLp, 100) / 100;
  }
  const div = divisao ?? 4;
  return idx * 4 + (4 - div) + clampedLp / 100;
}

export function rankProgress(
  startRank: Rank,
  startDivisao: number | undefined,
  currentRank: Rank,
  currentDivisao: number | undefined,
  currentLp: number,
  goalRank: Rank,
): number {
  const start = tierValue(startRank, startDivisao, 0);
  const current = tierValue(currentRank, currentDivisao, currentLp);
  const goal = tierValue(goalRank, 4, 0); // "chegar" no objetivo = entrar nele
  if (goal <= start) return 100;
  return Math.max(0, Math.min(100, ((current - start) / (goal - start)) * 100));
}

// LP real após cada partida (lpAntes + lpDelta), na ordem sequencial real do
// array — não recalcula por soma acumulada, então promoções que resetam o LP
// não bagunçam a conta. `idx` é a posição sequencial (1ª, 2ª, 3ª partida...),
// usada como eixo X nos gráficos pra não sobrepor partidas do mesmo dia.
export function lpTimeline(list: Match[]) {
  const sorted = [...list].sort((a, b) => a.data.localeCompare(b.data));
  return sorted.map((m, i) => ({
    idx: i + 1,
    data: m.data,
    lp: m.lpAntes + m.lpDelta,
    rank: m.rank,
    divisao: m.divisao,
    resultado: m.resultado,
  }));
}

export function rollingWinRate(list: Match[], window = 5) {
  const sorted = [...list].sort((a, b) => a.data.localeCompare(b.data));
  return sorted.map((m, idx) => {
    const slice = sorted.slice(Math.max(0, idx - window + 1), idx + 1);
    return {
      idx: idx + 1,
      data: m.data,
      winRate: Math.round(winRate(slice) * 10) / 10,
    };
  });
}

export function kdaSeries(list: Match[]) {
  const sorted = [...list].sort((a, b) => a.data.localeCompare(b.data));
  return sorted.map((m, idx) => ({
    idx: idx + 1,
    data: m.data,
    kda: Math.round(kda(m) * 100) / 100,
  }));
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('pt-BR').format(Math.round(n));
}

export interface ChampionLaneAgg {
  campeao: string;
  lane: Lane;
  partidas: number;
  vitorias: number;
  winRate: number;
  kdaMedio: number;
  mvp: number;
  ace: number;
}

const LANES: Lane[] = ['Topo', 'Selva', 'Meio', 'Atirador', 'Suporte'];

// Agrupa por (campeão, rota) — o mesmo campeão pode aparecer em mais de uma
// rota se você jogou ele em posições diferentes.
export function championsByLaneStats(list: Match[]): Record<Lane, ChampionLaneAgg[]> {
  const map = new Map<string, Match[]>();
  for (const m of list) {
    const key = `${m.campeao}|${m.lane}`;
    const arr = map.get(key) ?? [];
    arr.push(m);
    map.set(key, arr);
  }

  const result = {
    Topo: [], Selva: [], Meio: [], Atirador: [], Suporte: [],
  } as Record<Lane, ChampionLaneAgg[]>;

  for (const [key, matches] of map.entries()) {
    const [campeao, lane] = key.split('|') as [string, Lane];
    result[lane].push({
      campeao,
      lane,
      partidas: matches.length,
      vitorias: matches.filter((m) => m.resultado === 'vitoria').length,
      winRate: winRate(matches),
      kdaMedio: avgKda(matches),
      mvp: matches.filter((m) => m.nota?.toUpperCase() === 'MVP').length,
      ace: matches.filter((m) => m.nota?.toUpperCase() === 'ACE').length,
    });
  }

  for (const lane of LANES) {
    result[lane].sort((a, b) => b.partidas - a.partidas);
  }

  return result;
}

export interface RankDivisionAgg {
  label: string;
  rank: Rank;
  divisao?: number;
  partidas: number;
}

const ROMAN: Record<number, string> = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV' };

// Agrupa partidas por elo + divisão (ex: "Esmeralda IV", "Esmeralda III"),
// não só por elo — assim a distribuição real do grind aparece mesmo quando
// você passa a jornada inteira dentro de um único elo.
export function matchesByRankDivision(list: Match[]): RankDivisionAgg[] {
  const map = new Map<string, { rank: Rank; divisao?: number; count: number }>();
  for (const m of list) {
    const key = `${m.rank}|${m.divisao ?? ''}`;
    const cur = map.get(key) ?? { rank: m.rank, divisao: m.divisao, count: 0 };
    cur.count++;
    map.set(key, cur);
  }

  const arr: RankDivisionAgg[] = Array.from(map.values()).map((v) => ({
    label: v.divisao ? `${v.rank} ${ROMAN[v.divisao] ?? v.divisao}` : v.rank,
    rank: v.rank,
    divisao: v.divisao,
    partidas: v.count,
  }));

  arr.sort((a, b) => {
    const ai = RANK_ORDER.indexOf(a.rank);
    const bi = RANK_ORDER.indexOf(b.rank);
    if (ai !== bi) return ai - bi;
    return (b.divisao ?? 0) - (a.divisao ?? 0); // IV antes de III antes de II antes de I
  });

  return arr;
}