import React from 'react';
import { ATSReport } from '../types';
import { Award, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

interface ScoreGaugeProps {
  report: ATSReport;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ report }) => {
  const score = report.overall_score;

  const getScoreColor = () => {
    if (score >= 75) return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    if (score >= 50) return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
  };

  const getVerdict = () => {
    if (score >= 75) return { text: 'High Match Candidate', badge: 'bg-emerald-500/20 text-emerald-300' };
    if (score >= 50) return { text: 'Moderate Match (Needs Polish)', badge: 'bg-amber-500/20 text-amber-300' };
    return { text: 'Low Match (Missing Core Keywords)', badge: 'bg-rose-500/20 text-rose-300' };
  };

  const verdict = getVerdict();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Main Circular Score Indicator */}
        <div className="flex items-center gap-6">
          <div className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center font-bold ${getScoreColor()}`}>
            <span className="text-3xl tracking-tight">{score}%</span>
            <span className="text-[10px] uppercase font-semibold text-slate-400">ATS Score</span>
          </div>

          <div>
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider ${verdict.badge}`}>
              {verdict.text}
            </span>
            <h3 className="text-lg font-semibold text-white mt-2">Overall Match Quality</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              Weighted formula analyzing technical skills, action verb strength, and quantifiable results.
            </p>
          </div>
        </div>

        {/* Sub-Score Bars */}
        <div className="w-full sm:w-64 space-y-3 pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-slate-800 sm:pl-6">
          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" /> Skills Match (50%)
              </span>
              <span className="text-slate-100 font-semibold">{report.skill_score}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div
                className="bg-sky-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${report.skill_score}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="text-slate-300 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Power Verbs (25%)
              </span>
              <span className="text-slate-100 font-semibold">{report.verb_score}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${report.verb_score}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-indigo-400" /> Quantifiable Metrics (25%)
              </span>
              <span className="text-slate-100 font-semibold">{report.metric_score}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div
                className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${report.metric_score}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Banner */}
      {report.recommendations.length > 0 && (
        <div className="mt-6 pt-5 border-t border-slate-800">
          <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2 uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Priority Suggestions
          </h4>
          <ul className="space-y-1.5">
            {report.recommendations.map((rec, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-sky-400 font-bold">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
