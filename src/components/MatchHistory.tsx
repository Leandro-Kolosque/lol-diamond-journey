import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Match } from '../types/match';
import { kda } from '../lib/stats';
import { notaColor, tagColor } from '../lib/badges';

interface Props {
  matches: Match[];
}

const PAGE_SIZE = 20;

function formatDate(d: string) {
  const [y, m, day] = d.split('-');
  return `${day}/${m}/${y}`;
}

export default function MatchHistory({ matches }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [page, setPage] = useState(1);

const sorted = useMemo(
  () =>
    matches
      .map((m, i) => ({ m, i }))
      .sort((a, b) => b.m.data.localeCompare(a.m.data) || b.i - a.i)
      .map(({ m }) => m),
  [matches],
);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageMatches = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  function goToPage(p: number) {
    const clamped = Math.max(1, Math.min(totalPages, p));
    setPage(clamped);
    setExpanded(null);
    document.getElementById('partidas')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  return (
    <section id="partidas" className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">Histórico de partidas</h2>
        <p className="text-sm text-ink-500 dark:text-mist-400">
          {matches.length} registradas
          {totalPages > 1 && ` · página ${currentPage} de ${totalPages}`}
        </p>
      </div>

      <div className="border border-mist-300 dark:border-ink-800 rounded-xl2 overflow-hidden">
        <div className="overflow-x-auto thin-scroll">
          <table className="w-full text-sm min-w-[880px]">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-ink-500 dark:text-mist-400 bg-mist-200/60 dark:bg-ink-850">
                <th className="px-4 py-3 font-medium">Data</th>
                <th className="px-4 py-3 font-medium">Campeão</th>
                <th className="px-4 py-3 font-medium">Lane</th>
                <th className="px-4 py-3 font-medium">Resultado</th>
                <th className="px-4 py-3 font-medium">KDA</th>
                <th className="px-4 py-3 font-medium">CS</th>
                <th className="px-4 py-3 font-medium">Duração</th>
                <th className="px-4 py-3 font-medium">Elo</th>
                <th className="px-4 py-3 font-medium text-right">LP</th>
              </tr>
            </thead>
            <tbody>
              {pageMatches.map((m) => {
                const win = m.resultado === 'vitoria';
                const isOpen = expanded === m.id;
                return (
                  <React.Fragment key={m.id}>
                    <tr
                      onClick={() => setExpanded(isOpen ? null : m.id)}
                      className={`border-t border-mist-300 dark:border-ink-800 cursor-pointer transition-colors hover:bg-mist-200/50 dark:hover:bg-ink-850/60 ${
                        win ? 'border-l-[3px] border-l-win' : 'border-l-[3px] border-l-loss'
                      }`}
                    >
                      <td className="px-4 py-3 text-ink-500 dark:text-mist-400 font-mono text-xs">
                        {formatDate(m.data)}
                      </td>
                      <td className="px-4 py-3 font-medium">{m.campeao}</td>
                      <td className="px-4 py-3 text-ink-600 dark:text-mist-400">{m.lane}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              win
                                ? 'bg-win/10 text-win'
                                : 'bg-loss/10 text-loss'
                            }`}
                          >
                            {win ? 'Vitória' : 'Derrota'}
                          </span>
                          {m.nota && (
                            <span
                              className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[11px] font-mono font-semibold ${notaColor(m.nota).bg} ${notaColor(m.nota).text}`}
                            >
                              {m.nota}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono tabular-nums">
                        {m.kills}/{m.deaths}/{m.assists}
                        <span className="text-ink-500 dark:text-mist-400 ml-1.5 text-xs">
                          ({kda(m).toFixed(2)})
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono tabular-nums text-ink-600 dark:text-mist-400">{m.cs}</td>
                      <td className="px-4 py-3 font-mono tabular-nums text-ink-600 dark:text-mist-400">{m.duracaoMinutos}min</td>
                      <td className="px-4 py-3 text-ink-600 dark:text-mist-400">{m.rank}{m.divisao ? ` ${m.divisao}` : ''}</td>
                      <td
                        className={`px-4 py-3 text-right font-mono tabular-nums font-medium ${
                          m.lpDelta >= 0 ? 'text-win' : 'text-loss'
                        }`}
                      >
                        {m.lpDelta >= 0 ? '+' : ''}{m.lpDelta}
                      </td>
                    </tr>
                    {isOpen && (
                      <tr className="bg-mist-200/40 dark:bg-ink-850/40 border-t border-mist-300 dark:border-ink-800">
                        <td colSpan={9} className="px-4 py-4">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                            <div>
                              <p className="text-ink-500 dark:text-mist-400 mb-1">Dano causado</p>
                              <p className="font-mono font-medium">{m.danoCausado.toLocaleString('pt-BR')}</p>
                            </div>
                            <div>
                              <p className="text-ink-500 dark:text-mist-400 mb-1">Dano recebido</p>
                              <p className="font-mono font-medium">{m.danoRecebido.toLocaleString('pt-BR')}</p>
                            </div>
                            <div>
                              <p className="text-ink-500 dark:text-mist-400 mb-1">Participação em abates</p>
                              <p className="font-mono font-medium">{Math.round(m.participacaoAbates * 100)}%</p>
                            </div>
                            {m.tags && m.tags.length > 0 && (
                              <div className="col-span-full flex flex-wrap items-center gap-1.5">
                                {m.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${tagColor(tag).bg} ${tagColor(tag).text}`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            {m.observacoes && (
                              <div className="col-span-full">
                                <p className="text-ink-500 dark:text-mist-400 mb-1">Observações</p>
                                <p className="text-ink-700 dark:text-mist-200">{m.observacoes}</p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-5">
          <p className="text-xs text-ink-500 dark:text-mist-400">
            Mostrando {(currentPage - 1) * PAGE_SIZE + 1}–
            {Math.min(currentPage * PAGE_SIZE, sorted.length)} de {sorted.length}
          </p>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Página anterior"
              className="w-8 h-8 rounded-full flex items-center justify-center border border-mist-300 dark:border-ink-700 hover:border-brand/50 disabled:opacity-30 disabled:hover:border-mist-300 dark:disabled:hover:border-ink-700 transition-colors"
            >
              <ChevronLeft size={15} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                aria-current={p === currentPage ? 'page' : undefined}
                className={`min-w-8 h-8 px-2.5 rounded-full text-xs font-mono transition-colors ${
                  p === currentPage
                    ? 'bg-ink-950 dark:bg-mist-50 text-mist-50 dark:text-ink-950 font-semibold'
                    : 'border border-mist-300 dark:border-ink-700 hover:border-brand/50 text-ink-600 dark:text-mist-400'
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Próxima página"
              className="w-8 h-8 rounded-full flex items-center justify-center border border-mist-300 dark:border-ink-700 hover:border-brand/50 disabled:opacity-30 disabled:hover:border-mist-300 dark:disabled:hover:border-ink-700 transition-colors"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}