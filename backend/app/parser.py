import io
import re
from pypdf import PdfReader


def extract_text_from_pdf_bytes(pdf_bytes: bytes) -> str:
    """Extracts raw text from PDF file bytes in memory."""
    reader = PdfReader(io.BytesIO(pdf_bytes))
    extracted = []
    for page in reader.pages:
        text = page.extract_text()
        if text:
            extracted.append(text)
    return "\n".join(extracted).strip()


def extract_contact_info(text: str) -> dict:
    """Extracts email, phone, and professional profile links."""
    email_pattern = r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+"
    emails = re.findall(email_pattern, text)

    phone_pattern = r"(?:(?:\+91|91)[-.\s]?)?[6789]\d{9}"
    phones = re.findall(phone_pattern, text)

    linkedin_pattern = r"linkedin\.com/in/[a-zA-Z0-9-_]+"
    github_pattern = r"github\.com/[a-zA-Z0-9-_]+"

    linkedin = re.findall(linkedin_pattern, text, re.IGNORECASE)
    github = re.findall(github_pattern, text, re.IGNORECASE)

    return {
        "email": emails[0] if emails else "Not detected",
        "phone": phones[0] if phones else "Not detected",
        "linkedin": linkedin[0] if linkedin else "Not detected",
        "github": github[0] if github else "Not detected",
    }
