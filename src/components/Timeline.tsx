import type { JourneyMilestone } from '../types/match';
import { Flag, Award, TrendingDown, TrendingUp, RollerCoaster, Target, Star } from 'lucide-react';


interface Props {
  milestones: JourneyMilestone[];
}

const icons = {
  inicio: Flag,
  promocao: Award,
  sequencia_vitorias: TrendingUp,
  sequencia_derrotas: TrendingDown,
  montanha_russa: RollerCoaster,
  objetivo: Target,
  marco: Star,
};

function formatDate(d: string) {
  const [y, m, day] = d.split('-');
  return `${day}/${m}/${y}`;
}

export default function Timeline({ milestones }: Props) {
  const sorted = [...milestones].sort((a, b) => a.data.localeCompare(b.data));

  return (
    <section id="timeline" className="max-w-6xl mx-auto px-5 sm:px-8 py-16 pb-28">
      <div className="mb-10">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">A jornada</h2>
        <p className="text-sm text-ink-500 dark:text-mist-400 mt-1">principais marcos do desafio</p>
      </div>

      <div className="relative pl-8">
        <div className="absolute left-[9px] top-2 bottom-2 w-px bg-mist-300 dark:bg-ink-800" />

        <div className="space-y-9">
          {sorted.map((ms) => {
            const Icon = icons[ms.tipo];
            const isGoal = ms.tipo === 'objetivo';
            return (
              <div key={ms.id} className="relative">
                <div
                  className={`absolute -left-8 w-[19px] h-[19px] rounded-full flex items-center justify-center border-2 ${
                    isGoal
                      ? 'bg-diamond/15 border-diamond text-diamond'
                      : 'bg-mist-100 dark:bg-ink-950 border-brand text-brand'
                  }`}
                >
                  <Icon size={10} strokeWidth={2.5} />
                </div>
                <p className="text-xs font-mono text-ink-500 dark:text-mist-400 mb-1">
                  {formatDate(ms.data)}
                </p>
                <h3 className="font-display font-semibold text-[15px] mb-1">{ms.titulo}</h3>
                <p className="text-sm text-ink-600 dark:text-mist-400 max-w-lg leading-relaxed">
                  {ms.descricao}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
