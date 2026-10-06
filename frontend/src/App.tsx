import React, { useState } from 'react';
import { Header } from './components/Header';
import { ScoreGauge } from './components/ScoreGauge';
import { SkillsComparison } from './components/SkillsComparison';
import { BulletOptimizer } from './components/BulletOptimizer';
import { CandidateCard } from './components/CandidateCard';
import { ScanResponse } from './types';
import {
  Upload,
  FileText,
  Briefcase,
  Sparkles,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  FileCheck
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000';

export const App: React.FC = () => {
  const [tab, setTab] = useState<'pdf' | 'text'>('pdf');
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResponse | null>(null);

  // Load sample demo data
  const handleLoadSample = async () => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/sample`);
      if (response.ok) {
        const data = await response.json();
        setTab('text');
        setResumeText(data.sample_resume);
        setJobDescription(data.sample_job_description);
      } else {
        // Fallback sample
        setTab('text');
        setResumeText(`Rahul Verma\nEmail: rahul.verma@example.com | Phone: 9876543210\nLinkedIn: linkedin.com/in/rahulverma | GitHub: github.com/rahulverma\n\nEDUCATION: B.Tech Computer Science, Semester 5\nSKILLS: Python, SQL, React, Git, FastAPI, Docker, Linux\nEXPERIENCE: Built full-stack web applications with Python and React`);
        setJobDescription(`We are looking for a Software Developer.\nRequirements:\n- Strong knowledge of Python, SQL, and React.\n- Experience with Docker, AWS, and Git.\n- Knowledge of FastAPI is a plus.`);
      }
    } catch {
      // Offline fallback
      setTab('text');
      setResumeText(`Rahul Verma\nEmail: rahul.verma@example.com | Phone: 9876543210\nLinkedIn: linkedin.com/in/rahulverma | GitHub: github.com/rahulverma\n\nEDUCATION: B.Tech Computer Science, Semester 5\nSKILLS: Python, SQL, React, Git, FastAPI, Docker, Linux\nEXPERIENCE: Built full-stack web applications with Python and React`);
      setJobDescription(`We are looking for a Software Developer.\nRequirements:\n- Strong knowledge of Python, SQL, and React.\n- Experience with Docker, AWS, and Git.\n- Knowledge of FastAPI is a plus.`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (!selected.name.toLowerCase().endsWith('.pdf')) {
        setError('Please upload a valid .pdf document.');
        return;
      }
      setFile(selected);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!jobDescription.trim()) {
      setError('Please provide a target job description.');
      return;
    }

    if (tab === 'pdf' && !file) {
      setError('Please choose a PDF resume to upload.');
      return;
    }

    if (tab === 'text' && !resumeText.trim()) {
      setError('Please paste your resume text.');
      return;
    }

    setIsLoading(true);

    try {
      if (tab === 'pdf' && file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('job_description', jobDescription);

        const res = await fetch(`${API_BASE_URL}/api/scan-pdf`, {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.detail || 'Failed to scan PDF resume.');
        }

        const data: ScanResponse = await res.json();
        setResult(data);
      } else {
        const res = await fetch(`${API_BASE_URL}/api/scan-text`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            resume_text: resumeText,
            job_description: jobDescription,
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.detail || 'Failed to scan resume text.');
        }

        const data: ScanResponse = await res.json();
        setResult(data);
      }
    } catch (err: any) {
      setError(err.message || 'Error communicating with backend API. Ensure FastAPI server is running on port 8000.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setFile(null);
    setResumeText('');
    setJobDescription('');
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Applicant Tracking System (ATS) Intelligence
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Optimize Your Resume for <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Every Tech Job</span>
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            Scan your resume against any job description. Uncover missing keywords, verify contact info extraction, and level-up your bullet points.
          </p>

          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={handleLoadSample}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 shadow transition"
            >
              <FileCheck className="w-4 h-4 text-sky-400" />
              ⚡ Load Sample Demo
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-8 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3 max-w-3xl mx-auto">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Input Form Section */}
        {!result ? (
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Resume Ingestion Column */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-sky-400" />
                      1. Your Resume
                    </h3>

                    <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800 text-xs font-medium">
                      <button
                        type="button"
                        onClick={() => setTab('pdf')}
                        className={`px-3 py-1 rounded-md transition ${tab === 'pdf' ? 'bg-sky-500 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
                      >
                        PDF Upload
                      </button>
                      <button
                        type="button"
                        onClick={() => setTab('text')}
                        className={`px-3 py-1 rounded-md transition ${tab === 'text' ? 'bg-sky-500 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
                      >
                        Paste Text
                      </button>
                    </div>
                  </div>

                  {tab === 'pdf' ? (
                    <div className="border-2 border-dashed border-slate-700 hover:border-sky-500 rounded-xl p-8 text-center transition cursor-pointer relative bg-slate-950/40">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center">
                        <div className="p-3 rounded-full bg-sky-500/10 text-sky-400 mb-3">
                          <Upload className="w-6 h-6" />
                        </div>
                        {file ? (
                          <>
                            <p className="text-sm font-medium text-emerald-400">{file.name}</p>
                            <p className="text-xs text-slate-500 mt-1">{(file.size / 1024).toFixed(1)} KB • Ready to scan</p>
                          </>
                        ) : (
                          <>
                            <p className="text-xs font-medium text-slate-200">
                              Click or drag & drop your resume PDF here
                            </p>
                            <p className="text-[11px] text-slate-500 mt-1">Supported format: PDF up to 5MB</p>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <textarea
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      placeholder="Paste your plain text resume here (Summary, Skills, Experience, Education)..."
                      rows={10}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-500 transition resize-none font-mono"
                    />
                  )}
                </div>

                <p className="text-[11px] text-slate-500 mt-4 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Text extracted directly in memory. Files are not permanently stored.
                </p>
              </div>

              {/* Job Description Column */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-indigo-400" />
                      2. Target Job Description
                    </h3>
                    <span className="text-xs text-slate-400">Company Requirements</span>
                  </div>

                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description or role requirements here (e.g. required skills, tech stack, responsibilities)..."
                    rows={10}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition resize-none"
                  />
                </div>

                <p className="text-[11px] text-slate-500 mt-4">
                  💡 Tip: The more complete the requirements, the more accurate the gap analysis.
                </p>
              </div>
            </div>

            {/* Submit Action */}
            <div className="text-center pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-sky-500/25 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Analyzing Resume with ATS Engine...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Scan & Calculate ATS Score
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Analysis Results View */
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">ATS Analysis Results</h3>
                <p className="text-xs text-slate-400">Evaluation breakdown against target requirements</p>
              </div>

              <button
                onClick={handleReset}
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Scan Another Resume
              </button>
            </div>

            {/* Candidate Card */}
            <CandidateCard info={result.candidate_info} filename={result.filename} />

            {/* Score Gauge */}
            <ScoreGauge report={result.ats_report} />

            {/* Skills & Action Verbs Comparison */}
            <SkillsComparison report={result.ats_report} />

            {/* STAR Bullet Point Optimizer */}
            <BulletOptimizer rewrites={result.ats_report.bullet_rewrites} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <p>Built with Python (FastAPI), React, TypeScript & Tailwind CSS • Designed for Campus Placement Success</p>
      </footer>
    </div>
  );
};
