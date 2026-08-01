import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import type { Match } from '../types/match';
import { cumulativeLp, rollingWinRate, kdaSeries, RANK_ORDER } from '../lib/stats';

interface Props {
  matches: Match[];
}

function formatDate(d: string) {
  const [, m, day] = d.split('-');
  return `${day}/${m}`;
}

function formatDateLabel(label: unknown): string {
  if (typeof label !== 'string') return '';
  return formatDate(label);
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

export default function EvolutionCharts({ matches }: Props) {
  const lpData = cumulativeLp(matches);
  const wrData = rollingWinRate(matches, 5);
  const kdaData = kdaSeries(matches);

  const rankCounts = RANK_ORDER
    .map((rank) => ({ rank, partidas: matches.filter((m) => m.rank === rank).length }))
    .filter((r) => r.partidas > 0);

  return (
    <section id="evolucao" className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">Evolução</h2>
        <p className="text-sm text-ink-500 dark:text-mist-400">tendências ao longo da jornada</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <ChartCard title="LP acumulado" sub="Ganhos e perdas de LP, partida a partida">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lpData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="lpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5B67F1" stopOpacity={0.28} />
                  <stop offset="100%" stopColor="#5B67F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-mist-300 dark:stroke-ink-800" vertical={false} />
              <XAxis dataKey="data" tickFormatter={formatDate} tick={{ fontSize: 11, fill: '#8B93A7' }} axisLine={false} tickLine={false} minTickGap={24} />
              <YAxis tick={{ fontSize: 11, fill: '#8B93A7' }} axisLine={false} tickLine={false} width={36} />
              <Tooltip contentStyle={tooltipStyle} labelFormatter={formatDateLabel} />
              <Area type="monotone" dataKey="lp" stroke="#5B67F1" strokeWidth={2} fill="url(#lpGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Win rate (janela de 5 jogos)" sub="Taxa de vitória móvel, suaviza picos isolados">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={wrData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-mist-300 dark:stroke-ink-800" vertical={false} />
              <XAxis dataKey="data" tickFormatter={formatDate} tick={{ fontSize: 11, fill: '#8B93A7' }} axisLine={false} tickLine={false} minTickGap={24} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#8B93A7' }} axisLine={false} tickLine={false} width={36} />
              <Tooltip contentStyle={tooltipStyle} labelFormatter={formatDateLabel} formatter={(v) => [`${v}%`, 'Win rate']} />
              <Line type="monotone" dataKey="winRate" stroke="#29C48D" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Evolução do KDA" sub="KDA por partida ao longo do tempo">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={kdaData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-mist-300 dark:stroke-ink-800" vertical={false} />
              <XAxis dataKey="data" tickFormatter={formatDate} tick={{ fontSize: 11, fill: '#8B93A7' }} axisLine={false} tickLine={false} minTickGap={24} />
              <YAxis tick={{ fontSize: 11, fill: '#8B93A7' }} axisLine={false} tickLine={false} width={36} />
              <Tooltip contentStyle={tooltipStyle} labelFormatter={formatDateLabel} />
              <Line type="monotone" dataKey="kda" stroke="#D9A441" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Partidas por elo" sub="Distribuição do grind entre os elos percorridos">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rankCounts} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-mist-300 dark:stroke-ink-800" vertical={false} />
              <XAxis dataKey="rank" tick={{ fontSize: 11, fill: '#8B93A7' }} axisLine={false} tickLine={false} />
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
