import React from 'react';
import { ATSReport } from '../types';
import { Check, X, Plus, AlertCircle, Zap } from 'lucide-react';

interface SkillsComparisonProps {
  report: ATSReport;
}

export const SkillsComparison: React.FC<SkillsComparisonProps> = ({ report }) => {
  return (
    <div className="space-y-6">
      {/* Primary Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matched Skills */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
              <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
                <Check className="w-4 h-4" />
              </span>
              Matched Skills ({report.matched_skills.length})
            </h3>
            <span className="text-xs text-slate-400">Found in both resume & JD</span>
          </div>

          {report.matched_skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {report.matched_skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium capitalize flex items-center gap-1.5"
                >
                  <Check className="w-3 h-3" />
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No matching keywords found.</p>
          )}
        </div>

        {/* Missing Skills */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-rose-400 flex items-center gap-2">
              <span className="p-1 rounded-md bg-rose-500/20 text-rose-400">
                <X className="w-4 h-4" />
              </span>
              Missing Keywords ({report.missing_skills.length})
            </h3>
            <span className="text-xs text-rose-400/80 font-medium">Critical for ATS Pass</span>
          </div>

          {report.missing_skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {report.missing_skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium capitalize flex items-center gap-1.5"
                >
                  <Plus className="w-3 h-3 text-rose-400" />
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-emerald-400 font-medium">
              Excellent! You have matched all required keywords!
            </p>
          )}
        </div>
      </div>

      {/* Language / Action Verbs Audit Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          Action Verbs & Phrasing Audit
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <span className="text-xs font-medium text-emerald-400 block mb-2">
              Power Verbs Found ({report.power_verbs_detected.length})
            </span>
            {report.power_verbs_detected.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {report.power_verbs_detected.map((verb) => (
                  <span
                    key={verb}
                    className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[11px] font-medium capitalize"
                  >
                    {verb}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">No strong power verbs detected. Use verbs like "Engineered", "Optimized", "Architected".</p>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <span className="text-xs font-medium text-amber-400 flex items-center gap-1 mb-2">
              <AlertCircle className="w-3.5 h-3.5" /> Weak Phrases Detected ({report.weak_phrases_detected.length})
            </span>
            {report.weak_phrases_detected.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {report.weak_phrases_detected.map((phrase) => (
                  <span
                    key={phrase}
                    className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[11px] font-medium"
                  >
                    "{phrase}"
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-emerald-400">Great! No passive phrases detected.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
