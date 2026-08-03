import { Moon, Sun } from 'lucide-react';
import type { Theme } from '../lib/useTheme';

interface Props {
  theme: Theme;
  onToggleTheme: () => void;
  nomeJogador: string;
}

const links = [
  { href: '#dashboard', label: 'Painel' },
  { href: '#evolucao', label: 'Evolução' },
  { href: '#partidas', label: 'Partidas' },
  { href: '#campeoes-por-rota', label: 'Por rota' },
  { href: '#timeline', label: 'Jornada' },
];

export default function Nav({ theme, onToggleTheme, nomeJogador }: Props) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-mist-100/75 dark:bg-ink-950/75 border-b border-mist-300/70 dark:border-ink-800/70">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <svg width="18" height="18" viewBox="0 0 200 200" className="shrink-0">
            <polygon
              points="100,10 190,70 100,190 10,70"
              fill="#5B67F1"
              className="opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </svg>
          <span className="font-display font-semibold tracking-tight text-[15px]">
            {nomeJogador}<span className="text-brand">.</span>climb
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm text-ink-600 dark:text-mist-400">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-ink-950 dark:hover:text-mist-50 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          onClick={onToggleTheme}
          aria-label="Alternar tema"
          className="w-9 h-9 rounded-full flex items-center justify-center border border-mist-300 dark:border-ink-700 hover:border-brand/50 transition-colors"
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </header>
  );
}
