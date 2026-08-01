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

export function rankProgress(current: Rank, goal: Rank): number {
  const curIdx = RANK_ORDER.indexOf(current);
  const goalIdx = RANK_ORDER.indexOf(goal);
  if (goalIdx <= 0) return 100;
  return Math.max(0, Math.min(100, (curIdx / goalIdx) * 100));
}

export function cumulativeLp(list: Match[]) {
  const sorted = [...list].sort((a, b) => a.data.localeCompare(b.data));
  let acc = 0;
  return sorted.map((m) => {
    acc += m.lpDelta;
    return { data: m.data, lp: acc, rank: m.rank, resultado: m.resultado };
  });
}

export function rollingWinRate(list: Match[], window = 5) {
  const sorted = [...list].sort((a, b) => a.data.localeCompare(b.data));
  return sorted.map((_, idx) => {
    const slice = sorted.slice(Math.max(0, idx - window + 1), idx + 1);
    return {
      data: sorted[idx].data,
      winRate: Math.round(winRate(slice) * 10) / 10,
    };
  });
}

export function kdaSeries(list: Match[]) {
  const sorted = [...list].sort((a, b) => a.data.localeCompare(b.data));
  return sorted.map((m) => ({
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