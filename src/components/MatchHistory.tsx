import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import type { Lane, Match } from '../types/match';
import { kda } from '../lib/stats';
import { notaColor, tagColor } from '../lib/badges';

interface Props {
  matches: Match[];
}

const PAGE_SIZE = 20;
const LANES: Lane[] = ['Topo', 'Selva', 'Meio', 'Atirador', 'Suporte'];

function formatDate(d: string) {
  const [y, m, day] = d.split('-');
  return `${day}/${m}/${y}`;
}

type ResultadoFiltro = 'todos' | 'vitoria' | 'derrota';

export default function MatchHistory({ matches }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [busca, setBusca] = useState('');
  const [filtroResultado, setFiltroResultado] = useState<ResultadoFiltro>('todos');
  const [filtroLane, setFiltroLane] = useState<Lane | 'todas'>('todas');
  const [filtroCampeao, setFiltroCampeao] = useState<string>('todos');

  const campeoesDisponiveis = useMemo(
    () => Array.from(new Set(matches.map((m) => m.campeao))).sort((a, b) => a.localeCompare(b)),
    [matches],
  );

  const sorted = useMemo(
    () =>
      matches
        .map((m, i) => ({ m, i }))
        .sort((a, b) => b.m.data.localeCompare(a.m.data) || b.i - a.i)
        .map(({ m }) => m),
    [matches],
  );

  const filtered = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return sorted.filter((m) => {
      if (filtroResultado !== 'todos' && m.resultado !== filtroResultado) return false;
      if (filtroLane !== 'todas' && m.lane !== filtroLane) return false;
      if (filtroCampeao !== 'todos' && m.campeao !== filtroCampeao) return false;
      if (!termo) return true;
      const alvo = [m.campeao, m.observacoes ?? '', m.nota ?? '', ...(m.tags ?? [])]
        .join(' ')
        .toLowerCase();
      return alvo.includes(termo);
    });
  }, [sorted, busca, filtroResultado, filtroLane, filtroCampeao]);

  const filtrosAtivos =
    busca.trim() !== '' || filtroResultado !== 'todos' || filtroLane !== 'todas' || filtroCampeao !== 'todos';

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageMatches = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  function goToPage(p: number) {
    const clamped = Math.max(1, Math.min(totalPages, p));
    setPage(clamped);
    setExpanded(null);
    document.getElementById('partidas')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  function updateFilter<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v);
      setPage(1);
      setExpanded(null);
    };
  }

  function limparFiltros() {
    setBusca('');
    setFiltroResultado('todos');
    setFiltroLane('todas');
    setFiltroCampeao('todos');
    setPage(1);
    setExpanded(null);
  }

  const selectClass =
    'appearance-none bg-mist-50 dark:bg-ink-900 border border-mist-300 dark:border-ink-800 rounded-full pl-3 pr-7 py-1.5 text-xs text-ink-700 dark:text-mist-200 hover:border-brand/40 transition-colors cursor-pointer focus:outline-none focus:border-brand/50';

  return (
    <section id="partidas" className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">Histórico de partidas</h2>
        <p className="text-sm text-ink-500 dark:text-mist-400">
          {filtrosAtivos ? `${filtered.length} de ${matches.length}` : `${matches.length} registradas`}
          {totalPages > 1 && ` · página ${currentPage} de ${totalPages}`}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 mb-5">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500 dark:text-mist-400" />
          <input
            type="text"
            value={busca}
            onChange={(e) => updateFilter(setBusca)(e.target.value)}
            placeholder="Buscar campeão, tag, observação..."
            className="w-full bg-mist-50 dark:bg-ink-900 border border-mist-300 dark:border-ink-800 rounded-full pl-8 pr-3 py-1.5 text-xs placeholder:text-ink-500 dark:placeholder:text-mist-400 hover:border-brand/40 focus:outline-none focus:border-brand/50 transition-colors"
          />
        </div>

        <select
          value={filtroResultado}
          onChange={(e) => updateFilter(setFiltroResultado)(e.target.value as ResultadoFiltro)}
          className={selectClass}
        >
          <option value="todos">Resultado: todos</option>
          <option value="vitoria">Vitórias</option>
          <option value="derrota">Derrotas</option>
        </select>

        <select
          value={filtroLane}
          onChange={(e) => updateFilter(setFiltroLane)(e.target.value as Lane | 'todas')}
          className={selectClass}
        >
          <option value="todas">Lane: todas</option>
          {LANES.map((lane) => (
            <option key={lane} value={lane}>{lane}</option>
          ))}
        </select>

        <select
          value={filtroCampeao}
          onChange={(e) => updateFilter(setFiltroCampeao)(e.target.value)}
          className={selectClass}
        >
          <option value="todos">Campeão: todos</option>
          {campeoesDisponiveis.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {filtrosAtivos && (
          <button
            onClick={limparFiltros}
            className="inline-flex items-center gap-1 text-xs text-ink-500 dark:text-mist-400 hover:text-loss transition-colors px-2 py-1.5"
          >
            <X size={13} />
            Limpar
          </button>
        )}
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
              {pageMatches.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-sm text-ink-500 dark:text-mist-400">
                    Nenhuma partida encontrada com esses filtros.
                  </td>
                </tr>
              )}
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
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
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
                                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${tagColor(tag).bg} ${tagColor(tag).text}`}
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
            {Math.min(currentPage * PAGE_SIZE, filtered.length)} de {filtered.length}
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