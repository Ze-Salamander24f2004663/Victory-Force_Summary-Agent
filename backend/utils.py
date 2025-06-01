import fitz  # PyMuPDF
from docx import Document
import io

def extract_text_from_pdf(file_bytes):
    text = ""
    doc = fitz.open(stream=file_bytes, filetype="pdf")
    for page in doc:
        text += page.get_text()
    return text

def extract_text_from_docx(file_bytes):
    doc = Document(io.BytesIO(file_bytes))
    return "\n".join([para.text for para in doc.paragraphs])
async def extract_text_from_file(file):
    contents = await file.read()
    filename = file.filename.lower()

    if filename.endswith(".pdf"):
        return extract_text_from_pdf(contents)
    elif filename.endswith(".docx"):
        return extract_text_from_docx(contents)
    else:
        return contents.decode("utf-8")
