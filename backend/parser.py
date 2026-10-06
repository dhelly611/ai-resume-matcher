"""
============================================================
ATS Resume & Job Matcher - Step 2: PDF & Contact Parser
============================================================
Author: B.Tech Candidate
Description:
  Extracts raw text and candidate contact details from PDF files.
"""

import re
from pathlib import Path
from pypdf import PdfReader


def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Reads a PDF file page by page and returns the full text content.
    
    Why pypdf?
    - Pure Python, reliable, fast, and does not require external C++ dependencies.
    """
    file_path = Path(pdf_path)
    if not file_path.exists():
        raise FileNotFoundError(f"PDF file not found at: {pdf_path}")

    reader = PdfReader(str(file_path))
    extracted_text = []

    for page_number, page in enumerate(reader.pages, start=1):
        page_text = page.extract_text()
        if page_text:
            extracted_text.append(page_text)

    # Combine all pages into a single string separated by newlines
    full_text = "\n".join(extracted_text)
    return full_text.strip()


def extract_contact_info(text: str) -> dict:
    """
    Uses Regular Expressions (Regex) to extract key candidate contact info:
    - Email address
    - Phone number
    - LinkedIn URL
    - GitHub URL
    """
    # 1. Regex pattern for emails: name@domain.com
    email_pattern = r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+"
    emails = re.findall(email_pattern, text)

    # 2. Regex pattern for 10-digit phone numbers (supports +91, dashes, spaces)
    phone_pattern = r"(?:(?:\+91|91)[-.\s]?)?[6789]\d{9}"
    phones = re.findall(phone_pattern, text)

    # 3. Regex for LinkedIn and GitHub profiles
    linkedin_pattern = r"linkedin\.com/in/[a-zA-Z0-9-_]+"
    github_pattern = r"github\.com/[a-zA-Z0-9-_]+"

    linkedin = re.findall(linkedin_pattern, text, re.IGNORECASE)
    github = re.findall(github_pattern, text, re.IGNORECASE)

    return {
        "email": emails[0] if emails else "Not found",
        "phone": phones[0] if phones else "Not found",
        "linkedin": linkedin[0] if linkedin else "Not found",
        "github": github[0] if github else "Not found"
    }


# ============================================================
# Quick Demonstration & Unit Testing
# ============================================================
if __name__ == "__main__":
    pdf_sample_path = Path(__file__).parent / "sample_resume.pdf"
    
    if pdf_sample_path.exists():
        print("=" * 50)
        print(">>> READING SAMPLE RESUME PDF")
        print("=" * 50)
        extracted = extract_text_from_pdf(str(pdf_sample_path))
        print(f"[+] Raw PDF Extracted Text:\n{extracted}\n")

        print(">>> EXTRACTING CONTACT INFO FROM PDF")
        print("=" * 50)
        contacts = extract_contact_info(extracted)
        for key, value in contacts.items():
            print(f"[*] {key.capitalize()}: {value}")
        print("=" * 50)
    else:
        print("[!] No sample PDF found yet.")

