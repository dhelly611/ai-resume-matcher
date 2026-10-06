"""
============================================================
ATS Resume & Job Matcher - Step 1: Core Matching Logic
============================================================
Author: B.Tech Candidate
Description:
  Extracts skills from text and calculates an ATS compatibility score.
"""

# Predefined dictionary of common tech skills to look for
SKILLS_DATABASE = [
    "python", "java", "javascript", "typescript", "c++", "c#",
    "react", "angular", "vue", "node.js", "express", "fastapi", "django", "spring boot",
    "sql", "postgresql", "mysql", "mongodb", "redis",
    "git", "docker", "kubernetes", "aws", "azure", "linux"
]


def extract_skills(text: str) -> list[str]:
    """
    Scans a given text (resume or job description) and extracts
    any technical skills that match our database.
    
    1. text.lower() converts all text to lowercase so 'Python' and 'python' match.
    2. Checks if each skill word appears in the text.
    """
    clean_text = text.lower()
    found_skills = []
    
    for skill in SKILLS_DATABASE:
        if skill in clean_text:
            found_skills.append(skill)
            
    return found_skills


def analyze_ats_match(resume_text: str, job_text: str) -> dict:
    """
    Compares the resume against the job description and calculates:
    - matched skills
    - missing skills
    - match score percentage
    """
    # 1. Extract skills from both texts
    resume_skills = extract_skills(resume_text)
    job_skills = extract_skills(job_text)
    
    # 2. Find common (matched) and missing skills
    matched = [skill for skill in job_skills if skill in resume_skills]
    missing = [skill for skill in job_skills if skill not in resume_skills]
    
    # 3. Calculate match score percentage
    if len(job_skills) > 0:
        score = round((len(matched) / len(job_skills)) * 100, 1)
    else:
        score = 0.0

    return {
        "score": score,
        "matched_skills": matched,
        "missing_skills": missing,
        "total_required": len(job_skills),
        "total_matched": len(matched)
    }


# ============================================================
# Test our logic with sample data
# ============================================================
if __name__ == "__main__":
    sample_resume = """
    Software Engineering Student with experience in Python, SQL, and Git.
    Built web applications using FastAPI and React. Passionate about Linux systems.
    """

    sample_job_description = """
    We are looking for a Junior Software Developer.
    Requirements:
    - Proficiency in Python and SQL.
    - Hands-on experience with Docker, AWS, and Git.
    - Familiarity with React is a plus.
    """

    print("=" * 50)
    print("🚀 RUNNING ATS RESUME SCANNER")
    print("=" * 50)

    result = analyze_ats_match(sample_resume, sample_job_description)

    print(f"\n📊 ATS Match Score: {result['score']}%")
    print(f"✅ Matched Skills ({result['total_matched']}/{result['total_required']}): {result['matched_skills']}")
    print(f"❌ Missing Skills: {result['missing_skills']}\n")
    print("=" * 50)
