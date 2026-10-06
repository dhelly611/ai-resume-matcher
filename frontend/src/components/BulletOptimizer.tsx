import React, { useState } from 'react';
import { BulletRewrite } from '../types';
import { Sparkles, Copy, Check } from 'lucide-react';

interface BulletOptimizerProps {
  rewrites: BulletRewrite[];
}

export const BulletOptimizer: React.FC<BulletOptimizerProps> = ({ rewrites }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
          <Sparkles className="w-5 h-5" />
        </div>
        <h3 className="text-base font-semibold text-white">
          STAR Method Bullet Point Optimizer
        </h3>
      </div>
      <p className="text-xs text-slate-400 mb-6">
        Transform weak, passive statements into quantifiable, recruiter-proven achievements.
      </p>

      <div className="space-y-4">
        {rewrites.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
              {/* Original Weak Bullet */}
              <div className="p-3.5 rounded-lg bg-rose-500/5 border border-rose-500/20">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-rose-400 block mb-1">
                  Before (Passive)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{item.original}"
                </p>
              </div>

              {/* Optimized Strong Bullet */}
              <div className="p-3.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20 relative group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> After (STAR Format)
                  </span>
                  <button
                    onClick={() => handleCopy(item.optimized, index)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-[11px] font-medium transition"
                    title="Copy optimized bullet"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-emerald-200/90 font-medium leading-relaxed">
                  "{item.optimized}"
                </p>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-start gap-1.5 text-[11px] text-slate-400">
              <span className="text-sky-400 font-semibold">Engineering Note:</span>
              <span>{item.reason}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
