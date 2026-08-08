import type { JourneyMilestone } from '../types/match';

// Edite com os marcos reais da sua jornada.
export const milestones: JourneyMilestone[] = [
  {
    id: 't1',
    data: '2026-06-15',
    titulo: 'O Começo',
    descricao: 'Início oficial do desafio "Do Ban ao Diamante", partindo do Esmeralda IV.',
    tipo: 'inicio',
  },
  {
    id: 't2',
    data: '2026-06-19',
    titulo: 'Primeira partida',
    descricao: 'Primeiro jogo após o banimento.',
    tipo: 'marco',
  },
  {
    id: 't3',
    data: '2026-06-19',
    titulo: 'Foguete não tem ré',
    descricao: 'Saí do Esmeralda IV 0 PDL até o Esmeralda III 61 PDL.',
    tipo: 'sequencia_vitorias',
  },
  {
    id: 't4',
    data: '2026-08-04',
    titulo: 'Vitória Custosa',
    descricao: '5 vitórias, 3 derrotas - saldo positivo no papel, mas o nível de jogo incomodou mais do que o resultado.',
    tipo: 'vitoria_custosa',
  },
  {
    id: 't5',
    data: '2026-08-05',
    titulo: 'Esmeralda II finalmente',
    descricao: 'Finalmente alcancei o Esmeralda II com uma partida que me rendeu nada mais nada menos do que 4 Honras',
    tipo: 'marco',
  },
  {
    id: 't6',
    data: '2026-08-07',
    titulo: 'Caí pro Esmeralda III novamente',
    descricao: 'Acabei caindo para o Esmeralda III, apesar de jogar bem me senti bem givado',
    tipo: 'sequencia_derrotas',
  },
];
