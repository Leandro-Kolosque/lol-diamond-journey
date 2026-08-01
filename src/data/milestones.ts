import type { JourneyMilestone } from '../types/match';

// Edite com os marcos reais da sua jornada.
export const milestones: JourneyMilestone[] = [
  {
    id: 't1',
    data: '2026-02-01',
    titulo: 'O Começo',
    descricao: 'Início oficial do desafio "Do Ban ao Diamante", partindo do Esmeralda IV.',
    tipo: 'inicio',
  },
  {
    id: 't2',
    data: '2026-02-06',
    titulo: 'Primeira partida',
    descricao: 'Primeiro jogo após o banimento.',
    tipo: 'marco',
  },
  {
    id: 't3',
    data: '2026-02-16',
    titulo: 'Foguete não tem ré',
    descricao: 'Saí do Esmeralda IV 0 PDL até o Esmeralda II 6 PDL depois de duas semanas de grind consistente.',
    tipo: 'sequencia',
  },
  {
    id: 't4',
    data: '2026-03-16',
    titulo: 'Objetivo: Diamante',
    descricao: 'Reta final da jornada — o próximo grande marco.',
    tipo: 'objetivo',
  },
];
