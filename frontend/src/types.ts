export interface CandidateInfo {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export interface BulletRewrite {
  original: string;
  optimized: string;
  reason: string;
}

export interface ATSReport {
  overall_score: number;
  skill_score: number;
  verb_score: number;
  metric_score: number;
  matched_skills: string[];
  missing_skills: string[];
  extra_skills: string[];
  power_verbs_detected: string[];
  weak_phrases_detected: string[];
  metrics_detected: string[];
  recommendations: string[];
  bullet_rewrites: BulletRewrite[];
}

export interface ScanResponse {
  filename?: string;
  extracted_text_preview?: string;
  candidate_info: CandidateInfo;
  ats_report: ATSReport;
}
