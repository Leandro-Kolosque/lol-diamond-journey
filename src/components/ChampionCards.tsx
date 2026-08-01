import type { Match } from '../types/match';
import { championStats } from '../lib/stats';

interface Props {
  matches: Match[];
}

export default function ChampionCards({ matches }: Props) {
  const champs = championStats(matches);

  return (
    <section id="campeoes" className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">Campeões</h2>
        <p className="text-sm text-ink-500 dark:text-mist-400">{champs.length} utilizados</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {champs.map((c) => (
          <div
            key={c.campeao}
            className="bg-mist-50 dark:bg-ink-900 border border-mist-300 dark:border-ink-800 rounded-xl2 p-5 hover:border-brand/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-[15px]">{c.campeao}</h3>
              <span className="text-xs font-mono text-ink-500 dark:text-mist-400">
                {c.partidas} {c.partidas === 1 ? 'jogo' : 'jogos'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 mb-4">
              {Array.from({ length: c.partidas }).map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-4 rounded-full ${
                    i < c.vitorias ? 'bg-win' : 'bg-loss/60'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-ink-500 dark:text-mist-400 mb-0.5">Win rate</p>
                <p className="font-mono text-lg font-semibold tabular-nums">
                  {c.winRate.toFixed(0)}%
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-ink-500 dark:text-mist-400 mb-0.5">KDA médio</p>
                <p className="font-mono text-lg font-semibold tabular-nums">
                  {c.kdaMedio.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
