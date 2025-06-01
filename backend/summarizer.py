from transformers import pipeline

summarizer = pipeline("summarization")

def summarize_text(text, min_length=50, max_length=150):
    chunks = [text[i:i+1000] for i in range(0, len(text), 1000)]
    summaries = summarizer(chunks, min_length=min_length, max_length=max_length)
    return " ".join([s['summary_text'] for s in summaries])
