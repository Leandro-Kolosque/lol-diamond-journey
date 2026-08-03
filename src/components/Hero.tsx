import DiamondProgress from './DiamondProgress';
import { RANK_ORDER, rankProgress } from '../lib/stats';
import type { Rank } from '../types/match';

interface Props {
  titulo: string;
  descricao: string;
  rankInicial: Rank;
  rankInicialDivisao?: 1 | 2 | 3 | 4;
  rankAtual: Rank;
  divisaoAtual?: 1 | 2 | 3 | 4;
  lpAtual: number;
  objetivo: Rank;
  totalPartidas: number;
  diasDeJornada: number;
}

export default function Hero({
  titulo,
  descricao,
  rankInicial,
  rankInicialDivisao,
  rankAtual,
  divisaoAtual,
  lpAtual,
  objetivo,
  totalPartidas,
  diasDeJornada,
}: Props) {
  const progress = rankProgress(
    rankInicial,
    rankInicialDivisao,
    rankAtual,
    divisaoAtual,
    lpAtual,
    objetivo,
  );

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-14 items-center">
          <div className="animate-fadeUp">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              Desafio pessoal · {RANK_ORDER.indexOf(rankAtual) + 1}/{RANK_ORDER.length} elos
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold tracking-tight leading-[1.05]">
              {titulo}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-ink-600 dark:text-mist-400 leading-relaxed max-w-xl">
              {descricao}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#partidas"
                className="inline-flex items-center gap-2 bg-ink-950 dark:bg-mist-50 text-mist-50 dark:text-ink-950 px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-85 transition-opacity"
              >
                Ver todas as partidas
              </a>

              <a
                href="#timeline"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-mist-300 dark:border-ink-700 hover:border-brand/50 transition-colors"
              >
                Ver a jornada
              </a>
            </div>

            <div className="mt-10 flex items-center gap-8 text-sm">
              <div>
                <p className="font-mono text-xl font-semibold tabular-nums">
                  {totalPartidas}
                </p>
                <p className="text-ink-500 dark:text-mist-400 text-xs mt-0.5">
                  partidas registradas
                </p>
              </div>

              <div className="w-px h-9 bg-mist-300 dark:bg-ink-700" />

              <div>
                <p className="font-mono text-xl font-semibold tabular-nums">
                  {diasDeJornada}
                </p>
                <p className="text-ink-500 dark:text-mist-400 text-xs mt-0.5">
                  dias de grind
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center md:justify-end animate-floatSlow">
            <div className="bg-mist-50 dark:bg-ink-900 border border-mist-300 dark:border-ink-800 rounded-xl2 p-8 shadow-card dark:shadow-card-dark">
              <DiamondProgress
                progress={progress}
                rankAtual={rankAtual}
                objetivo={objetivo}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
