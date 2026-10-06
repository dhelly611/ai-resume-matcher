import React from 'react';
import { CandidateInfo } from '../types';
import { Mail, Phone, Linkedin, Github, UserCheck } from 'lucide-react';

interface CandidateCardProps {
  info: CandidateInfo;
  filename?: string;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ info, filename }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-sky-400" />
          Candidate Profile & Contacts
        </h3>
        {filename && (
          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
            {filename}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
            <Mail className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Email</span>
            <span className="text-xs text-slate-200 truncate block font-mono" title={info.email}>
              {info.email}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Phone className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Phone</span>
            <span className="text-xs text-slate-200 truncate block font-mono">
              {info.phone}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Linkedin className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">LinkedIn</span>
            <span className="text-xs text-slate-200 truncate block font-mono" title={info.linkedin}>
              {info.linkedin}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
            <Github className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">GitHub</span>
            <span className="text-xs text-slate-200 truncate block font-mono" title={info.github}>
              {info.github}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
