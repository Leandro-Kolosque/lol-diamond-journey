import { useState } from 'react';
import type { Match, Lane } from '../types/match';
import { championsByLaneStats, type ChampionLaneAgg } from '../lib/stats';
import { championImages } from '../data/championImages';
import { useHoverCapable } from '../lib/useHoverCapable';

const LANES: Lane[] = ['Topo', 'Selva', 'Meio', 'Atirador', 'Suporte'];

const PLACEHOLDER_GRADIENTS = [
  'from-brand to-diamond',
  'from-win to-brand',
  'from-lp to-loss',
  'from-diamond to-loss',
  'from-brand-dim to-brand-soft',
];

function initials(name: string) {
  return name
    .split(/[\s']/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

function gradientFor(name: string) {
  let hash = 0;
  for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) >>> 0;
  return PLACEHOLDER_GRADIENTS[hash % PLACEHOLDER_GRADIENTS.length];
}

function ChampionCard({ agg }: { agg: ChampionLaneAgg }) {
  const hoverCapable = useHoverCapable();
  const [flipped, setFlipped] = useState(false);
  const image = championImages[agg.campeao];

  const handlers = hoverCapable
    ? {
        onMouseEnter: () => setFlipped(true),
        onMouseLeave: () => setFlipped(false),
      }
    : { onClick: () => setFlipped((f) => !f) };

  return (
    <div className="[perspective:1200px] select-none" {...handlers}>
      <div
        className={`relative w-full aspect-[3/4] transition-transform duration-1000 ease-out [transform-style:preserve-3d] cursor-pointer ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Frente */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-xl2 overflow-hidden border border-mist-300 dark:border-ink-800">
          {image ? (
            <img src={image} alt={agg.campeao} className="w-full h-full object-cover" />
          ) : (
            <div
              className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradientFor(agg.campeao)}`}
            >
              <span className="font-display text-3xl font-bold text-mist-50/90">
                {initials(agg.campeao)}
              </span>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/90 via-ink-950/40 to-transparent p-3">
            <p className="text-mist-50 font-display font-semibold text-sm leading-tight truncate">
              {agg.campeao}
            </p>
            <p className="text-diamond font-mono text-xs font-semibold mt-0.5">
              {agg.partidas} {agg.partidas === 1 ? 'partida' : 'partidas'}
            </p>
          </div>
        </div>

        {/* Verso */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl2 border border-mist-300 dark:border-ink-800 bg-mist-50 dark:bg-ink-900 p-4 flex flex-col justify-between">
          <div>
            <p className="font-display font-semibold text-sm truncate">{agg.campeao}</p>
            <p className="text-xs text-ink-500 dark:text-mist-400">{agg.lane}</p>
          </div>
          <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
            <div>
              <p className="text-ink-500 dark:text-mist-400 mb-0.5">Win rate</p>
              <p className="font-mono font-semibold text-win">{agg.winRate.toFixed(0)}%</p>
            </div>
            <div>
              <p className="text-ink-500 dark:text-mist-400 mb-0.5">KDA médio</p>
              <p className="font-mono font-semibold">{agg.kdaMedio.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-ink-500 dark:text-mist-400 mb-0.5">Partidas</p>
              <p className="font-mono font-semibold">{agg.partidas}</p>
            </div>
            <div>
              <p className="text-ink-500 dark:text-mist-400 mb-0.5">MVP / ACE</p>
              <p className="font-mono font-semibold">
                <span className="text-[#EB9C00]">{agg.mvp}</span>
                <span className="text-ink-400 dark:text-mist-400 mx-0.5">/</span>
                <span className="text-[#A855F7]">{agg.ace}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  matches: Match[];
}

export default function ChampionsByLane({ matches }: Props) {
  const byLane = championsByLaneStats(matches);

  return (
    <section id="campeoes-por-rota" className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
      <div className="mb-8">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
          Campeões por rota
        </h2>
        <p className="text-sm text-ink-500 dark:text-mist-400 mt-1">
          passe o mouse (ou toque) no card pra ver os números
        </p>
      </div>

      <div className="space-y-10">
        {LANES.filter((lane) => byLane[lane]?.length).map((lane) => (
          <div key={lane}>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wide text-ink-500 dark:text-mist-400 mb-4">
              {lane}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {byLane[lane].map((agg) => (
                <ChampionCard key={`${agg.campeao}-${agg.lane}`} agg={agg} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}