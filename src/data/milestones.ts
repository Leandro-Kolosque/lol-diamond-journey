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
];
