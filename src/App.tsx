import { useEffect } from 'react';

import Nav from './components/Nav';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import EvolutionCharts from './components/EvolutionCharts';
import MatchHistory from './components/MatchHistory';
import ChampionsByLane from './components/ChampionsByLane';
import Timeline from './components/Timeline';
import { useTheme } from './lib/useTheme';
import { matches } from './data/matches';
import { milestones } from './data/milestones';
import { journeyConfig } from './data/config';
import { lpTimeline, winRate } from './lib/stats';
import { printConsoleEasterEgg } from './lib/consoleEasterEgg';

function App() {
  const { theme, toggle } = useTheme();

  const sorted = [...matches].sort((a, b) => a.data.localeCompare(b.data));
  const lastMatch = sorted[sorted.length - 1];
  const lpSeries = lpTimeline(matches);
  const lpAtual = lpSeries.length ? lpSeries[lpSeries.length - 1].lp : 0;
  const rankAtual = lastMatch?.rank ?? journeyConfig.rankInicial;
  const divisaoAtual = lastMatch?.divisao;

  const diasDeJornada = sorted.length
    ? Math.max(
      1,
      Math.round(
        (new Date(sorted[sorted.length - 1].data).getTime() -
          new Date(journeyConfig.dataInicio).getTime()) /
        86400000,
      ),
    )
    : 0;

  useEffect(() => {
    printConsoleEasterEgg({
      rankAtual,
      divisaoAtual,
      lpAtual,
      winRatePct: winRate(matches),
      totalPartidas: matches.length,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen">
      <Nav theme={theme} onToggleTheme={toggle} nomeJogador={journeyConfig.nomeJogador} />

      <main>
        <Hero
          titulo={journeyConfig.tituloHero}
          descricao={journeyConfig.descricaoHero}
          rankInicial={journeyConfig.rankInicial}
          rankInicialDivisao={journeyConfig.rankInicialDivisao}
          rankAtual={rankAtual}
          divisaoAtual={divisaoAtual}
          lpAtual={lpAtual}
          objetivo={journeyConfig.objetivoRank}
          totalPartidas={matches.length}
          diasDeJornada={diasDeJornada}
        />
        <Dashboard matches={matches} rankAtual={rankAtual} lpAtual={lpAtual} />
        <EvolutionCharts matches={matches} />
        <MatchHistory matches={matches} />
        <ChampionsByLane matches={matches} />
        <Timeline milestones={milestones} />
      </main>

      <footer className="border-t border-mist-300 dark:border-ink-800 py-8">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-500 dark:text-mist-400">
          <p>{journeyConfig.tituloHero} — diário de climb de {journeyConfig.nomeJogador}</p>
          <p>Objetivo: {journeyConfig.objetivoRank}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;