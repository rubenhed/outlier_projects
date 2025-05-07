"use client";

import React, { memo, useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

type Issue = {
  id: number;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  opened: string;
};

type Summary = {
  commits: number;
  prs: number;
  codeCoverage: number;
  buildSuccess: number;
  avgPrMergeTime: number;
  criticalIssues: number;
};

type Trends = {
  commits: number[];
  codeCoverage: number[];
  prMergeTime: number[];
  buildSuccess: number[];
};

type TeamMember = {
  name: string;
  commits: number;
  reviews: number;
  coverage: number;
};

type Analytics = {
  summary: Summary;
  trends: Trends;
  issues: Issue[];
  team: TeamMember[];
};

type Role = 'Engineer' | 'Lead' | 'Manager';

const mockAnalytics: Analytics  = {
  summary: {
    commits: 128,
    prs: 22,
    codeCoverage: 79,
    buildSuccess: 95,
    avgPrMergeTime: 3.5,
    criticalIssues: 2,
  },
  trends: {
    commits: [12, 15, 9, 22, 18, 11, 41],
    codeCoverage: [73, 73, 74, 76, 77, 78, 79],
    prMergeTime: [3.7, 2.9, 4.1, 3.2, 3.0, 2.7, 3.5],
    buildSuccess: [92, 96, 93, 95, 97, 95, 95],
  },
  issues: [
    { id: 1, title: 'Memory leak in user service', severity: 'Critical', opened: '2024-06-15' },
    { id: 2, title: 'Flaky test in payments', severity: 'Critical', opened: '2024-06-14' },
    { id: 3, title: 'API response time regression', severity: 'High', opened: '2024-06-13' },
  ],
  team: [
    { name: 'Alice', commits: 32, reviews: 14, coverage: 81 },
    { name: 'Bob', commits: 27, reviews: 8, coverage: 75 },
    { name: 'Carol', commits: 21, reviews: 12, coverage: 79 },
    { name: 'Dave', commits: 17, reviews: 11, coverage: 72 },
  ],
};

const THEME = {
  bg: 'bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50',
  card: 'bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-blue-100/50',
  text: {
    primary: 'text-blue-900',
    secondary: 'text-blue-600',
    accent: 'text-indigo-600',
  },
  button: {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
  },
};

const DASH_CARDS = [
  { label: 'Commits', key: 'commits', icon: '📝' },
  { label: 'PRs', key: 'prs', icon: '🔀' },
  { label: 'Coverage', key: 'codeCoverage', icon: '📈', suffix: '%' },
  { label: 'Build Success', key: 'buildSuccess', icon: '✅', suffix: '%' },
  { label: 'Avg PR Merge', key: 'avgPrMergeTime', icon: '⏱️', suffix: 'h' },
  { label: 'Critical Issues', key: 'criticalIssues', icon: '🚨' },
];

const RoleSwitcher = memo(({ role, setRole }: { role: Role; setRole: (role: Role) => void }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6" role="tablist">
      {['Engineer', 'Lead', 'Manager'].map(r => (
        <button
          key={r}
          role="tab"
          aria-selected={r === role}
          onClick={() => setRole(r as Role)}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-200 text-sm
            ${r === role ? THEME.button.primary : THEME.button.secondary}`}
        >
          {r}
        </button>
      ))}
    </div>
  );
});

const SummaryCard = memo(({ card, value }: { card: typeof DASH_CARDS[0]; value: number | string }) => (
  <motion.div
    className={`${THEME.card} p-4 flex flex-col items-center text-center`}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <span className="text-2xl mb-2">{card.icon}</span>
    <div className={`text-xl font-bold ${THEME.text.primary}`}>
      {value}
      {card.suffix ?? ''}
    </div>
    <div className={`text-xs ${THEME.text.secondary}`}>{card.label}</div>
  </motion.div>
));

const SummaryCards = memo(({ summary }: { summary: Summary }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
    {DASH_CARDS.map(card => (
      <SummaryCard
        key={card.key}
        card={card}
        value={summary[card.key as keyof Summary]}
      />
    ))}
  </div>
));

const TrendChart = memo(({ data, label, min, max }: { data: number[]; label: string; min?: number; max?: number }) => {
  const chartData = {
    labels: data.map((_, i) => `Day ${i + 1}`),
    datasets: [{
      label,
      data,
      borderColor: '#4F46E5',
      backgroundColor: 'rgba(79, 70, 229, 0.1)',
      tension: 0.4,
      fill: true,
    }],
  };

  return (
    <div className={`${THEME.card} p-4`}>
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { min, max, beginAtZero: false },
          },
          plugins: {
            legend: { display: false },
            title: { display: true, text: label, color: '#1E3A8A' },
          },
        }}
        height={200}
      />
    </div>
  );
});

const TrendsSection = memo(({ trends, role }: { trends: Trends; role: Role }) => (
  <div className="space-y-4">
    <TrendChart data={trends.commits} label="Commits (7d)" />
    {role !== 'Engineer' && (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TrendChart data={trends.codeCoverage} label="Code Coverage (%)" min={60} max={100} />
        <TrendChart data={trends.prMergeTime} label="PR Merge Time (h)" min={0} max={8} />
      </div>
    )}
    {role === 'Manager' && (
      <TrendChart data={trends.buildSuccess} label="Build Success (%)" min={80} max={100} />
    )}
  </div>
));

const IssuesList = memo(({ issues, role }: { issues: Issue[]; role: Role }) => (
  <div className={`${THEME.card} p-4 overflow-x-auto`}>
    <h3 className={`font-semibold mb-3 ${THEME.text.primary}`}>Open Issues</h3>
    <table className="w-full text-sm">
      <thead>
        <tr className={THEME.text.secondary}>
          <th className="text-left py-2">Title</th>
          <th className="text-left py-2">Severity</th>
          <th className="text-left py-2">Opened</th>
        </tr>
      </thead>
      <tbody>
        <AnimatePresence>
          {issues
            .filter(i => role === 'Manager' || i.severity === 'Critical' || i.severity === 'High')
            .map(issue => (
              <motion.tr
                key={issue.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <td className="py-2">{issue.title}</td>
                <td>
                  <span
                    className={
                      issue.severity === 'Critical'
                        ? 'text-red-600 font-bold'
                        : 'text-orange-500'
                    }
                  >
                    {issue.severity}
                  </span>
                </td>
                <td className={THEME.text.secondary}>{issue.opened}</td>
              </motion.tr>
            ))}
        </AnimatePresence>
      </tbody>
    </table>
  </div>
));

const TeamTable = memo(({ team, role }: { team: TeamMember[]; role: Role }) => {
  const user = team[0];
  return (
    <div className={`${THEME.card} p-4 overflow-x-auto`}>
      <h3 className={`font-semibold mb-3 ${THEME.text.primary}`}>Team Stats</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className={THEME.text.secondary}>
            <th className="py-2 text-left">Name</th>
            <th className="py-2 text-center">Commits</th>
            <th className="py-2 text-center">Reviews</th>
            <th className="py-2 text-center">Coverage (%)</th>
          </tr>
        </thead>
        <tbody>
          {(role === 'Engineer' ? [user] : team).map(member => (
            <tr key={member.name}>
              <td className="py-2">{member.name}</td>
              <td className="text-center">{member.commits}</td>
              <td className="text-center">{member.reviews}</td>
              <td className="text-center">{member.coverage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

const FooterInfo = memo(() => (
  <footer className="mt-8 mb-4 text-center text-xs text-blue-500">
    WinterChill Analytics © 2025. Data from Git & CI/CD pipelines.
  </footer>
));

const AnalyticsApp: React.FC = () => {
  const [role, setRole] = useState<Role>('Engineer');
  const data = mockAnalytics;

  return (
    <div className={`${THEME.bg} min-h-screen flex flex-col items-center py-6 px-4`}>
      <Head>
        <title>WinterChill Code Analytics</title>
        <meta
          name="description"
          content="Code quality & efficiency dashboard for dev teams."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="w-full max-w-5xl">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`text-3xl sm:text-4xl font-bold ${THEME.text.primary} tracking-tight`}>
            WinterChill Analytics
          </h1>
          <p className={`mt-2 text-sm sm:text-base ${THEME.text.secondary}`}>
            Code quality & efficiency for dev teams
          </p>
        </motion.div>

        <RoleSwitcher role={role} setRole={setRole} />

        {(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <SummaryCards summary={data.summary} />
            <TrendsSection trends={data.trends} role={role} />
            <IssuesList issues={data.issues} role={role} />
            <TeamTable team={data.team} role={role} />
          </motion.div>
        )}
      </main>
      <FooterInfo />
    </div>
  );
};

export default AnalyticsApp;