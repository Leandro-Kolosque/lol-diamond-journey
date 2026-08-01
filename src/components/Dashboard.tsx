import type { ReactNode } from 'react';
import { Flame, Trophy, TrendingDown, Swords, Target, Gem, Crosshair } from 'lucide-react';
import type { Match, Rank } from '../types/match';
import {
  avgKda, winRate, currentStreak, bestChampion, mostPlayedChampion,
} from '../lib/stats';

interface Props {
  matches: Match[];
  rankAtual: Rank;
  lpAtual: number;
}

function StatCard({
  icon, label, value, accent, sub,
}: { icon: ReactNode; label: string; value: string; accent?: string; sub?: string }) {
  return (
    <div className="bg-mist-50 dark:bg-ink-900 border border-mist-300 dark:border-ink-800 rounded-xl2 p-5 hover:border-brand/40 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <span className="text-ink-500 dark:text-mist-400 text-xs uppercase tracking-wide font-medium">
          {label}
        </span>
        <span className={accent ?? 'text-ink-500 dark:text-mist-400'}>{icon}</span>
      </div>
      <p className="font-mono sm:text-xl md:text-2xl font-semibold tabular-nums">{value}</p>
      {sub && <p className="text-xs text-ink-500 dark:text-mist-400 mt-1">{sub}</p>}
    </div>
  );
}

export default function Dashboard({ matches, rankAtual, lpAtual }: Props) {
  const wins = matches.filter((m) => m.resultado === 'vitoria').length;
  const losses = matches.length - wins;
  const wr = winRate(matches);
  const streak = currentStreak(matches);
  const best = bestChampion(matches);
  const mostPlayed = mostPlayedChampion(matches);

  return (
    <section id="dashboard" className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">Painel</h2>
        <p className="text-sm text-ink-500 dark:text-mist-400">estado atual da jornada</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Gem size={17} />}
          label="Elo atual"
          value={rankAtual}
          accent="text-diamond"
        />
        <StatCard
          icon={<Target size={17} />}
          label="LP atual"
          value={`${lpAtual} LP`}
          accent="text-lp"
        />
        <StatCard
          icon={<Trophy size={17} />}
          label="Win rate"
          value={`${wr.toFixed(1)}%`}
          accent="text-win"
        />
        <StatCard
          icon={<Swords size={17} />}
          label="Partidas"
          value={String(matches.length)}
        />
        <StatCard
          icon={<Trophy size={17} />}
          label="Vitórias"
          value={String(wins)}
          accent="text-win"
        />
        <StatCard
          icon={<TrendingDown size={17} />}
          label="Derrotas"
          value={String(losses)}
          accent="text-loss"
        />
        <StatCard
          icon={<Flame size={17} />}
          label={streak.type === 'derrota' ? 'Sequência de derrotas' : 'Sequência de vitórias'}
          value={streak.count > 0 ? `${streak.count}` : '—'}
          accent={streak.type === 'derrota' ? 'text-loss' : 'text-win'}
        />
        <StatCard
          icon={<Crosshair size={17} />}
          label="KDA médio"
          value={avgKda(matches).toFixed(2)}
        />
        <StatCard
          icon={<Trophy size={17} />}
          label="Melhor campeão"
          value={best?.campeao ?? '—'}
          sub={best ? `${best.winRate.toFixed(0)}% WR em ${best.partidas} jogos` : undefined}
          accent="text-win"
        />
        <StatCard
          icon={<Swords size={17} />}
          label="Mais utilizado"
          value={mostPlayed?.campeao ?? '—'}
          sub={mostPlayed ? `${mostPlayed.partidas} partidas` : undefined}
        />
      </div>
    </section>
  );
}
