export type Result = 'vitoria' | 'derrota';

export type Lane =
  | 'Topo'
  | 'Selva'
  | 'Meio'
  | 'Atirador'
  | 'Suporte';

export type Rank =
  | 'Ferro'
  | 'Bronze'
  | 'Prata'
  | 'Ouro'
  | 'Platina'
  | 'Esmeralda'
  | 'Diamante'
  | 'Mestre'
  | 'Grão-Mestre'
  | 'Desafiante';

export interface Match {
  id: string;
  data: string; // ISO date string, e.g. "2026-02-14"
  resultado: Result;
  campeao: string;
  lane: Lane;
  kills: number;
  deaths: number;
  assists: number;
  duracaoMinutos: number;
  cs: number;
  danoCausado: number;
  danoRecebido: number;
  participacaoAbates: number; // 0-1 (percentage as fraction)
  rank: Rank;
  divisao?: 1 | 2 | 3 | 4;
  lpAntes: number;
  lpDelta: number; // positive = ganho, negative = perdido
  nota?: string; // selo curto exibido na linha principal, ex: 'S+', 'MVP', 'ACE'
  tags?: string[]; // conquistas da partida, exibidas no expandido, ex: ['Double Kill', 'Imparável']
  observacoes?: string;
}

export interface JourneyMilestone {
  id: string;
  data: string;
  titulo: string;
  descricao: string;
  tipo: 'inicio' | 'promocao' | 'sequencia' | 'objetivo' | 'marco';
}

export interface JourneyConfig {
  nomeJogador: string;
  objetivoRank: Rank;
  rankInicial: Rank;
  rankInicialDivisao?: 1 | 2 | 3 | 4;
  dataInicio: string;
  tituloHero: string;
  descricaoHero: string;
}