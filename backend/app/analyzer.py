import re

# Comprehensive tech skills dictionary
SKILLS_DATABASE = [
    # Programming Languages
    "python", "java", "javascript", "typescript", "c++", "c#", "go", "rust", "kotlin", "swift", "php", "ruby", "sql",
    # Frameworks & Libraries
    "react", "next.js", "vue", "angular", "node.js", "express", "fastapi", "django", "flask", "spring boot", "tailwind css",
    # Databases & Caching
    "postgresql", "postgres", "mysql", "mongodb", "redis", "sqlite", "cassandra", "elasticsearch",
    # Cloud, DevOps & Tools
    "docker", "kubernetes", "aws", "azure", "gcp", "git", "github", "ci/cd", "linux", "rest api", "graphql", "kafka",
    # Concepts
    "data structures", "algorithms", "microservices", "machine learning", "deep learning", "nlp"
]

POWER_VERBS = [
    "engineered", "architected", "spearheaded", "developed", "built",
    "optimized", "deployed", "implemented", "automated", "designed",
    "reduced", "increased", "accelerated", "integrated", "delivered"
]

WEAK_PHRASES = [
    "worked on", "responsible for", "helped with", "assisted in", "tried to", "part of a team that"
]


def extract_skills(text: str) -> list[str]:
    """Finds all technical skills mentioned in the given text."""
    lower_text = text.lower()
    matched = []
    for skill in SKILLS_DATABASE:
        # Match as word boundary when possible
        pattern = r"\b" + re.escape(skill) + r"\b"
        if re.search(pattern, lower_text):
            matched.append(skill)
    return matched


def audit_bullet_points(text: str) -> dict:
    """
    Evaluates action verbs and quantifiable metrics (numbers/percentages).
    """
    lower_text = text.lower()
    
    # Check for strong action verbs
    found_power_verbs = [verb for verb in POWER_VERBS if re.search(r"\b" + verb + r"\b", lower_text)]
    found_weak_phrases = [phrase for phrase in WEAK_PHRASES if phrase in lower_text]

    # Check for numbers / quantifiable metrics (e.g. 20%, $10k, 500+ users, 2x)
    metrics_pattern = r"\b\d+(?:\.\d+)?%|\b\d+x\b|\$\d+[\d,]*|\b\d+\+\b|\b\d+ (?:ms|seconds|users|requests|records|clients)\b"
    metrics_found = re.findall(metrics_pattern, lower_text)

    # Score components
    verb_score = min(100, len(found_power_verbs) * 20)
    metric_score = min(100, len(metrics_found) * 25)

    return {
        "power_verbs": found_power_verbs,
        "weak_phrases": found_weak_phrases,
        "metrics_found": metrics_found,
        "verb_score": verb_score,
        "metric_score": metric_score,
    }


def generate_bullet_suggestions() -> list[dict]:
    """Provides sample before-and-after bullet point transformations using the STAR method."""
    return [
        {
            "original": "Worked on the backend API using Python and helped fix bugs.",
            "optimized": "Engineered RESTful microservices using FastAPI and Python, reducing API latency by 35% and resolving 20+ critical issues.",
            "reason": "Replaced weak verb 'Worked on' with 'Engineered', and added quantifiable metrics (35% reduction)."
        },
        {
            "original": "Responsible for managing the database and doing queries.",
            "optimized": "Architected PostgreSQL database schemas with indexed queries, accelerating data retrieval times by 40% across 50,000+ records.",
            "reason": "Specified database technology, indexed querying, and metric of scale (50,000+ records)."
        }
    ]


def calculate_ats_report(resume_text: str, job_text: str) -> dict:
    """
    Computes a comprehensive ATS analysis report combining:
    1. Skill Match (50% weight)
    2. Power Verb Strength (25% weight)
    3. Quantifiable Metrics (25% weight)
    """
    resume_skills = extract_skills(resume_text)
    job_skills = extract_skills(job_text)

    matched_skills = [s for s in job_skills if s in resume_skills]
    missing_skills = [s for s in job_skills if s not in resume_skills]
    extra_skills = [s for s in resume_skills if s not in job_skills]

    skill_score = (len(matched_skills) / len(job_skills) * 100) if job_skills else 100.0
    
    bullet_audit = audit_bullet_points(resume_text)
    
    # Composite Weighted ATS Score
    overall_score = round(
        (skill_score * 0.50) + (bullet_audit["verb_score"] * 0.25) + (bullet_audit["metric_score"] * 0.25),
        1
    )

    # Actionable suggestions
    recommendations = []
    if missing_skills:
        top_missing = ", ".join(missing_skills[:4])
        recommendations.append(f"Add critical missing keywords required by the job: {top_missing}.")
    if bullet_audit["weak_phrases"]:
        recommendations.append(f"Replace passive phrasing ({', '.join(bullet_audit['weak_phrases'])}) with active power verbs.")
    if len(bullet_audit["metrics_found"]) < 2:
        recommendations.append("Include more quantifiable numbers or metrics (e.g., percentages, scale, speed improvements).")
    if not recommendations:
        recommendations.append("Strong resume! Ensure your project links (GitHub/Live demo) are verified and accessible.")

    return {
        "overall_score": min(100.0, overall_score),
        "skill_score": round(skill_score, 1),
        "verb_score": bullet_audit["verb_score"],
        "metric_score": bullet_audit["metric_score"],
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "extra_skills": extra_skills,
        "power_verbs_detected": bullet_audit["power_verbs"],
        "weak_phrases_detected": bullet_audit["weak_phrases"],
        "metrics_detected": bullet_audit["metrics_found"],
        "recommendations": recommendations,
        "bullet_rewrites": generate_bullet_suggestions()
    }
