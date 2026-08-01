import { useEffect, useState } from 'react';

interface Props {
  progress: number; // 0-100
  rankAtual: string;
  objetivo: string;
}

// Um "gema" facetada que se preenche de baixo pra cima conforme o progresso.
// É o elemento de assinatura da página: a métrica central (progresso até Diamante)
// representada como o próprio objeto que dá nome ao elo.
export default function DiamondProgress({ progress, rankAtual, objetivo }: Props) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(progress), 200);
    return () => clearTimeout(t);
  }, [progress]);

  const clipId = 'diamond-clip';
  const fillHeight = 100 - animated; // % from top that stays unfilled

  return (
    <div className="relative flex flex-col items-center">
      <svg
        viewBox="0 0 200 200"
        className="w-40 h-40 sm:w-52 sm:h-52 drop-shadow-[0_0_40px_rgba(69,198,232,0.15)]"
      >
        <defs>
          <clipPath id={clipId}>
            <polygon points="100,10 190,70 100,190 10,70" />
          </clipPath>
          <linearGradient id="diamondFill" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#45C6E8" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>
        </defs>

        {/* outline */}
        <polygon
          points="100,10 190,70 100,190 10,70"
          fill="none"
          className="stroke-ink-700/40 dark:stroke-mist-400/20"
          strokeWidth="1.5"
        />

        {/* fill, clipped to diamond, animated from bottom */}
        <g clipPath={`url(#${clipId})`}>
          <rect
            x="0"
            y="0"
            width="200"
            height="200"
            fill="url(#diamondFill)"
            style={{
              transform: `translateY(${fillHeight * 2}px)`,
              transition: 'transform 1.4s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        </g>

        {/* facet lines */}
        <g className="stroke-ink-950/10 dark:stroke-mist-50/15" strokeWidth="1" fill="none">
          <line x1="10" y1="70" x2="190" y2="70" />
          <line x1="100" y1="10" x2="55" y2="70" />
          <line x1="100" y1="10" x2="145" y2="70" />
          <line x1="55" y1="70" x2="100" y2="190" />
          <line x1="145" y1="70" x2="100" y2="190" />
        </g>

        {/* outer contour on top for crispness */}
        <polygon
          points="100,10 190,70 100,190 10,70"
          fill="none"
          className="stroke-ink-950/20 dark:stroke-mist-50/25"
          strokeWidth="1.5"
        />
      </svg>

      <div className="mt-4 text-center">
        <p className="font-mono text-2xl sm:text-3xl font-semibold tabular-nums">
          {Math.round(animated)}%
        </p>
        <p className="text-sm text-ink-600 dark:text-mist-400 mt-1">
          {rankAtual} <span className="opacity-40">→</span> {objetivo}
        </p>
      </div>
    </div>
  );
}
