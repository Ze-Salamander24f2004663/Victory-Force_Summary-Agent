from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from utils import extract_text_from_file
from summarizer import summarize_text

app = FastAPI()

# Allow requests from frontend (Vite runs on port 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or ["http://localhost:5173"]
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/summarize_file")
async def summarize_file(file: UploadFile = File(...)):
    # Extract text from uploaded DOCX or PDF
    text = await extract_text_from_file(file)
    
    # Summarize the text
    summary = summarize_text(text)
    
    return {"summary": summary}
