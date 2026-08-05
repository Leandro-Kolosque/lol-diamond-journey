import type { Match } from '../types/match';

/**
 * Adicione um novo objeto ao FINAL do array a cada partida jogada.
 * A lista deve ficar em ordem cronológica crescente (a mais antiga no topo,
 * a mais recente por último) — é assim que os gráficos e o histórico calculam
 * a sequência real das partidas. Quando duas partidas têm a mesma data, é a
 * posição delas aqui no array que desempata qual veio primeiro.
 */
export const matches: Match[] = [
  {
    id: 'm001',
    data: '2026-06-15',
    resultado: 'derrota',       // 'vitoria' | 'derrota'
    campeao: 'Varus',
    lane: 'Atirador',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 1, deaths: 9, assists: 2,
    duracaoMinutos: 31,
    cs: 147,
    danoCausado: 7934,
    danoRecebido: 14000,
    participacaoAbates: 0.1,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 4,
    lpAntes: 22,
    lpDelta: -22,
    nota: '10th',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['Lutador'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: 'PARTIDA QUE ORIGINOU O BAN',            // opcional
  },
  {
    id: 'm002',
    data: '2026-06-19',
    resultado: 'vitoria',       // 'vitoria' | 'derrota'
    campeao: 'Veigar',
    lane: 'Meio',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 14, deaths: 4, assists: 6,
    duracaoMinutos: 33,
    cs: 258,
    danoCausado: 43187,
    danoRecebido: 30699,
    participacaoAbates: 0.49,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 4,
    lpAntes: 0,
    lpDelta: +19,
    nota: 'MVP',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['MVP'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: 'Primeira partida pós banimento, AMASSEI',            // opcional
  },
  {
    id: 'm003',
    data: '2026-06-19',
    resultado: 'vitoria',       // 'vitoria' | 'derrota'
    campeao: 'Aphelios',
    lane: 'Atirador',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 18, deaths: 2, assists: 4,
    duracaoMinutos: 30,
    cs: 263,
    danoCausado: 34311,
    danoRecebido: 15863,
    participacaoAbates: 0.43,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 4,
    lpAntes: 19,
    lpDelta: +19,
    nota: '2nd',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['Vitorioso', 'Triple Kill'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: 'Jogando no auge do ódio',            // opcional
  },
  {
    id: 'm004',
    data: '2026-06-19',
    resultado: 'vitoria',       // 'vitoria' | 'derrota'
    campeao: 'Aphelios',
    lane: 'Atirador',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 7, deaths: 7, assists: 19,
    duracaoMinutos: 36,
    cs: 277,
    danoCausado: 40901,
    danoRecebido: 26194,
    participacaoAbates: 0.63,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 4,
    lpAntes: 38,
    lpDelta: +19,
    nota: '3rd',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['Imparável', 'Double Kill'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: 'Jogando no auge do ódio',            // opcional
  },
  {
    id: 'm005',
    data: '2026-06-22',
    resultado: 'derrota',       // 'vitoria' | 'derrota'
    campeao: 'Sivir',
    lane: 'Atirador',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 5, deaths: 10, assists: 10,
    duracaoMinutos: 33,
    cs: 340,
    danoCausado: 28.540,
    danoRecebido: 32741,
    participacaoAbates: 0.58,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 4,
    lpAntes: 57,
    lpDelta: -22,
    nota: 'ACE',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['ACE', 'Azarado'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: 'Primeira derrota após o ban',            // opcional
  },
  {
    id: 'm006',
    data: '2026-06-23',
    resultado: 'derrota',       // 'vitoria' | 'derrota'
    campeao: 'Smolder',
    lane: 'Atirador',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 2, deaths: 5, assists: 3,
    duracaoMinutos: 35,
    cs: 334,
    danoCausado: 31062,
    danoRecebido: 21937,
    participacaoAbates: 0.36,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 4,
    lpAntes: 35,
    lpDelta: -22,
    nota: '7th',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['Médio'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: 'Segunda derrota após o ban',            // opcional
  },
  {
    id: 'm007',
    data: '2026-06-23',
    resultado: 'vitoria',       // 'vitoria' | 'derrota'
    campeao: 'Xayah',
    lane: 'Atirador',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 11, deaths: 2, assists: 11,
    duracaoMinutos: 26,
    cs: 239,
    danoCausado: 24630,
    danoRecebido: 13757,
    participacaoAbates: 0.73,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 4,
    lpAntes: 13,
    lpDelta: +18,
    nota: '2nd',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['Imparável', 'Double Kill'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: 'Começando uma sequência sensacional',            // opcional
  },
  {
    id: 'm008',
    data: '2026-06-23',
    resultado: 'vitoria',       // 'vitoria' | 'derrota'
    campeao: 'Xayah',
    lane: 'Atirador',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 4, deaths: 3, assists: 10,
    duracaoMinutos: 30,
    cs: 265,
    danoCausado: 21.281,
    danoRecebido: 17299,
    participacaoAbates: 0.45,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 4,
    lpAntes: 31,
    lpDelta: +18,
    nota: 'MVP',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['Imparável', 'MVP'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: 'Sequência sensacional',            // opcional
  },
  {
    id: 'm009',
    data: '2026-06-23',
    resultado: 'vitoria',       // 'vitoria' | 'derrota'
    campeao: 'Caitlyn',
    lane: 'Atirador',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 3, deaths: 9, assists: 8,
    duracaoMinutos: 40,
    cs: 293,
    danoCausado: 29.962,
    danoRecebido: 26.064,
    participacaoAbates: 0.39,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 4,
    lpAntes: 49,
    lpDelta: +18,
    nota: '8th',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['Resiliente'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: 'Sequência sensacional',            // opcional
  },
  {
    id: 'm010',
    data: '2026-06-23',
    resultado: 'vitoria',       // 'vitoria' | 'derrota'
    campeao: 'Caitlyn',
    lane: 'Atirador',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 16, deaths: 6, assists: 11,
    duracaoMinutos: 37,
    cs: 274,
    danoCausado: 57.683,
    danoRecebido: 26.545,
    participacaoAbates: 0.54,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 4,
    lpAntes: 67,
    lpDelta: +18,
    nota: 'MVP',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['Quadra Kill', 'MVP', 'Imparável'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: 'Sequência sensacional',            // opcional
  },
    {
    id: 'm011',
    data: '2026-06-24',
    resultado: 'vitoria',       // 'vitoria' | 'derrota'
    campeao: 'Xayah',
    lane: 'Atirador',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 6, deaths: 2, assists: 11,
    duracaoMinutos: 30,
    cs: 265,
    danoCausado: 24.113,
    danoRecebido: 12.874,
    participacaoAbates: 0.53,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 4,
    lpAntes: 85,
    lpDelta: +18,
    nota: '3rd',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['Double Kill', 'Atrasado'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: 'Sequência sensacional',            // opcional
  },
    {
    id: 'm012',
    data: '2026-06-30',
    resultado: 'vitoria',       // 'vitoria' | 'derrota'
    campeao: 'Caitlyn',
    lane: 'Atirador',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 8, deaths: 5, assists: 7,
    duracaoMinutos: 30,
    cs: 250,
    danoCausado: 34.381,
    danoRecebido: 18.560,
    participacaoAbates: 0.39,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 3,
    lpAntes: 3,
    lpDelta: +18,
    nota: '3rd',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['Double Kill', 'Vitorioso'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: 'Sequência sensacional',            // opcional
  },
    {
    id: 'm013',
    data: '2026-06-30',
    resultado: 'vitoria',       // 'vitoria' | 'derrota'
    campeao: 'Xayah',
    lane: 'Atirador',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 17, deaths: 7, assists: 13,
    duracaoMinutos: 33,
    cs: 281,
    danoCausado: 54.655,
    danoRecebido: 26.388,
    participacaoAbates: 0.63,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 3,
    lpAntes: 3,
    lpDelta: +18,
    nota: 'MVP',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['MVP', 'Triple Kill', 'Imparável'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: 'Sequência sensacional',            // opcional
  },
    {
    id: 'm014',
    data: '2026-06-30',
    resultado: 'vitoria',       // 'vitoria' | 'derrota'
    campeao: 'Caitlyn',
    lane: 'Atirador',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 16, deaths: 6, assists: 12,
    duracaoMinutos: 39,
    cs: 295,
    danoCausado: 34.898,
    danoRecebido: 21.625,
    participacaoAbates: 0.61,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 3,
    lpAntes: 21,
    lpDelta: +18,
    nota: '3rd',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['Imparável'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: 'Sequência sensacional',            // opcional
  },
    {
    id: 'm015',
    data: '2026-06-30',
    resultado: 'vitoria',       // 'vitoria' | 'derrota'
    campeao: 'Aphelios',
    lane: 'Atirador',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 0, deaths: 3, assists: 7,
    duracaoMinutos: 22,
    cs: 250,
    danoCausado: 6.220,
    danoRecebido: 6.279,
    participacaoAbates: 0.37,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 3,
    lpAntes: 39,
    lpDelta: +18,
    nota: '4th',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['Vitorioso'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: 'Sequência sensacional',            // opcional
  },
    {
    id: 'm016',
    data: '2026-07-01',
    resultado: 'vitoria',       // 'vitoria' | 'derrota'
    campeao: 'Varus',
    lane: 'Atirador',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 5, deaths: 6, assists: 3,
    duracaoMinutos: 34,
    cs: 250,
    danoCausado: 25.962,
    danoRecebido: 19.044,
    participacaoAbates: 0.20,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 3,
    lpAntes: 57,
    lpDelta: +19,
    nota: '8th',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['Queda'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: 'Sequência sensacional',            // opcional
  },
    {
    id: 'm017',
    data: '2026-07-01',
    resultado: 'derrota',       // 'vitoria' | 'derrota'
    campeao: 'Caitlyn',
    lane: 'Atirador',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 4, deaths: 4, assists: 0,
    duracaoMinutos: 34,
    cs: 328,
    danoCausado: 29.936,
    danoRecebido: 18.356,
    participacaoAbates: 0.57,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 3,
    lpAntes: 76,
    lpDelta: -22,
    nota: 'ACE',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['ACE','Queda', 'Double Kill'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: 'Sequência sensacional',            // opcional
  },
    {
    id: 'm018',
    data: '2026-08-03',
    resultado: 'derrota',       // 'vitoria' | 'derrota'
    campeao: 'Xayah',
    lane: 'Atirador',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 14, deaths: 8, assists: 14,
    duracaoMinutos: 49,
    cs: 402,
    danoCausado: 70.909,
    danoRecebido: 40.724,
    participacaoAbates: 0.51,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 3,
    lpAntes: 54,
    lpDelta: -11,
    nota: 'ACE',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['ACE','Médio', 'Double Kill'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: '',            // opcional
  },
    {
    id: 'm019',
    data: '2026-08-03',
    resultado: 'vitoria',       // 'vitoria' | 'derrota'
    campeao: 'Draven',
    lane: 'Atirador',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 16, deaths: 3, assists: 3,
    duracaoMinutos: 24,
    cs: 198,
    danoCausado: 28.397,
    danoRecebido: 12.270,
    participacaoAbates: 0.44,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 3,
    lpAntes: 43,
    lpDelta: +18,
    nota: 'MVP',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['MVP','Imparável', 'Double Kill'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: 'DRAVENNNN',            // opcional
  },
    {
    id: 'm020',
    data: '2026-08-04',
    resultado: 'vitoria',       // 'vitoria' | 'derrota'
    campeao: 'Xayah',
    lane: 'Atirador',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 4, deaths: 5, assists: 19,
    duracaoMinutos: 32,
    cs: 258,
    danoCausado: 26.811,
    danoRecebido: 21.367,
    participacaoAbates: 0.57,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 3,
    lpAntes: 61,
    lpDelta: +18,
    nota: '3rd',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['Atrasado'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: 'Senti que meu npivel caiu nesse dia',            // opcional
  },
    {
    id: 'm021',
    data: '2026-08-04',
    resultado: 'derrota',       // 'vitoria' | 'derrota'
    campeao: 'Draven',
    lane: 'Atirador',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 6, deaths: 11, assists: 10,
    duracaoMinutos: 32,
    cs: 226,
    danoCausado: 19.540,
    danoRecebido: 24.483,
    participacaoAbates: 0.43,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 3,
    lpAntes: 79,
    lpDelta: -22,
    nota: '8th',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['Triple Kill', 'Inflexível'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: 'Minha pior partida da season até o momento',            // opcional
  },
    {
    id: 'm022',
    data: '2026-08-04',
    resultado: 'derrota',       // 'vitoria' | 'derrota'
    campeao: 'Xerath',
    lane: 'Suporte',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 4, deaths: 10, assists: 18,
    duracaoMinutos: 38,
    cs: 52,
    danoCausado: 31.050,
    danoRecebido: 28.329,
    participacaoAbates: 0.50,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 3,
    lpAntes: 57,
    lpDelta: -22,
    nota: '6th',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['Montanha Russa'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: 'Devido ao meu desempenho abaixo no dia decidi jogar suporte',            // opcional
  },
    {
    id: 'm023',
    data: '2026-08-04',
    resultado: 'vitoria',       // 'vitoria' | 'derrota'
    campeao: 'Vel Koz',
    lane: 'Suporte',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 7, deaths: 1, assists: 17,
    duracaoMinutos: 24,
    cs: 46,
    danoCausado: 19.628,
    danoRecebido: 9.591,
    participacaoAbates: 0.73,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 3,
    lpAntes: 35,
    lpDelta: +19,
    nota: 'MVP',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['MVP','Imparável'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: 'Uma boa atuação de Vel Koz',            // opcional
  },
    {
    id: 'm024',
    data: '2026-08-04',
    resultado: 'vitoria',       // 'vitoria' | 'derrota'
    campeao: 'Vel Koz',
    lane: 'Suporte',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 3, deaths: 2, assists: 8,
    duracaoMinutos: 27,
    cs: 46,
    danoCausado: 18.880,
    danoRecebido: 13.162,
    participacaoAbates: 0.32,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 3,
    lpAntes: 54,
    lpDelta: +19,
    nota: '5th',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['Atrasado'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: '',            // opcional
  },
    {
    id: 'm025',
    data: '2026-08-04',
    resultado: 'vitoria',       // 'vitoria' | 'derrota'
    campeao: 'Zilean',
    lane: 'Suporte',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 1, deaths: 3, assists: 13,
    duracaoMinutos: 28,
    cs: 37,
    danoCausado: 7.660,
    danoRecebido: 15.305,
    participacaoAbates: 0.40,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 3,
    lpAntes: 73,
    lpDelta: +18,
    nota: '6th',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['Resiliente'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: '',            // opcional
  },
    {
    id: 'm026',
    data: '2026-08-04',
    resultado: 'derrota',       // 'vitoria' | 'derrota'
    campeao: 'Zilean',
    lane: 'Suporte',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 2, deaths: 11, assists: 14,
    duracaoMinutos: 32,
    cs: 29,
    danoCausado: 28.927,
    danoRecebido: 15.305,
    participacaoAbates: 0.55,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 3,
    lpAntes: 91,
    lpDelta: -22,
    nota: '10th',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['Lutador'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: 'Nada mais nada menos do que um TILT',            // opcional
  },
    {
    id: 'm027',
    data: '2026-08-04',
    resultado: 'vitoria',       // 'vitoria' | 'derrota'
    campeao: 'Caitlyn',
    lane: 'Atirador',           // 'Topo' | 'Selva' | 'Meio' | 'Atirador' | 'Suporte'
    kills: 6, deaths: 9, assists: 7,
    duracaoMinutos: 32,
    cs: 198,
    danoCausado: 20.846,
    danoRecebido: 24.750,
    participacaoAbates: 0.25,      // 0 a 1
    rank: 'Esmeralda',                   // 'Ferro' .. 'Desafiante'
    divisao: 3,
    lpAntes: 69,
    lpDelta: +19,
    nota: '7th',                   // opcional: 'S+', 'MVP', 'ACE'
    tags: ['Lutador'],                   // opcional: ['Double Kill', 'Imparável', 'Azarado'...]
    observacoes: 'Dia para esquecer, performances ruins',            // opcional
  },
];