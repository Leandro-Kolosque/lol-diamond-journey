import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import type { Match } from '../types/match';
import { lpTimeline, rollingWinRate, kdaSeries, matchesByRankDivision } from '../lib/stats';

interface Props {
  matches: Match[];
}

function formatDate(d: string) {
  const [, m, day] = d.split('-');
  return `${day}/${m}`;
}

// Tooltip mostra a data real da partida, não só o número sequencial do eixo X.
function dateLabelFormatter(_label: unknown, payload: readonly { payload?: { data?: string } }[] | undefined) {
  const raw = payload?.[0]?.payload?.data;
  return typeof raw === 'string' ? formatDate(raw) : '';
}

function ChartCard({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="bg-mist-50 dark:bg-ink-900 border border-mist-300 dark:border-ink-800 rounded-xl2 p-5 sm:p-6">
      <div className="mb-5">
        <h3 className="font-display font-semibold text-[15px]">{title}</h3>
        <p className="text-xs text-ink-500 dark:text-mist-400 mt-0.5">{sub}</p>
      </div>
      <div className="h-56">{children}</div>
    </div>
  );
}

const tooltipStyle = {
  backgroundColor: 'var(--tooltip-bg, #11151D)',
  border: '1px solid #2A3242',
  borderRadius: 10,
  fontSize: 12,
  fontFamily: 'Inter, sans-serif',
  padding: '8px 12px',
};

// Eixo X comum às séries por partida: número sequencial real (1ª, 2ª, 3ª...),
// não a data — assim partidas no mesmo dia não se sobrepõem no gráfico.
const xAxisProps = {
  dataKey: 'idx' as const,
  type: 'number' as const,
  domain: [1, 'dataMax'] as [number, 'dataMax'],
  allowDecimals: false,
  tick: { fontSize: 11, fill: '#8B93A7' },
  axisLine: false,
  tickLine: false,
  tickFormatter: (v: number) => `#${v}`,
};

export default function EvolutionCharts({ matches }: Props) {
  const lpData = lpTimeline(matches);
  const wrData = rollingWinRate(matches, 5);
  const kdaData = kdaSeries(matches);
  const rankDivisionCounts = matchesByRankDivision(matches);

  return (
    <section id="evolucao" className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">Evolução</h2>
        <p className="text-sm text-ink-500 dark:text-mist-400">tendências ao longo da jornada, por ordem real de partida</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <ChartCard title="Evolução de LP" sub="LP real após cada partida — reseta a cada promoção de divisão/elo">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lpData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="lpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5B67F1" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#5B67F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-mist-300 dark:stroke-ink-800" vertical={false} />
              <XAxis {...xAxisProps} />
              <YAxis tick={{ fontSize: 11, fill: '#8B93A7' }} axisLine={false} tickLine={false} width={36} />
              <Tooltip contentStyle={tooltipStyle} labelFormatter={dateLabelFormatter} />
              <Area type="monotone" dataKey="lp" stroke="#5B67F1" strokeWidth={2} fill="url(#lpGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Win rate (janela de 5 jogos)" sub="Taxa de vitória móvel, suaviza picos isolados">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={wrData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-mist-300 dark:stroke-ink-800" vertical={false} />
              <XAxis {...xAxisProps} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#8B93A7' }} axisLine={false} tickLine={false} width={36} />
              <Tooltip contentStyle={tooltipStyle} labelFormatter={dateLabelFormatter} formatter={(v) => [`${v}%`, 'Win rate']} />
              <Line type="monotone" dataKey="winRate" stroke="#29C48D" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Evolução do KDA" sub="KDA por partida, na ordem em que foram jogadas">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={kdaData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-mist-300 dark:stroke-ink-800" vertical={false} />
              <XAxis {...xAxisProps} />
              <YAxis tick={{ fontSize: 11, fill: '#8B93A7' }} axisLine={false} tickLine={false} width={36} />
              <Tooltip contentStyle={tooltipStyle} labelFormatter={dateLabelFormatter} />
              <Line type="monotone" dataKey="kda" stroke="#D9A441" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Partidas por elo e divisão" sub="Distribuição do grind, elo a elo e divisão a divisão">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rankDivisionCounts} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-mist-300 dark:stroke-ink-800" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#8B93A7' }} axisLine={false} tickLine={false} interval={0} angle={-20} textAnchor="end" height={45} />
              <YAxis tick={{ fontSize: 11, fill: '#8B93A7' }} axisLine={false} tickLine={false} width={28} allowDecimals={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="partidas" fill="#45C6E8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </section>
  );
}