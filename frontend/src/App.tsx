import React, { useState } from "react";

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState("");
  const [maxLength, setMaxLength] = useState(150);
  const [minLength, setMinLength] = useState(50);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleGenerateSummary = async () => {
    if (!file) {
      alert("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("min_length", minLength.toString());
    formData.append("max_length", maxLength.toString());

    const response = await fetch("http://localhost:8000/summarize_file", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setSummary(data.summary);
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "yellow",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>
          📄 AI Document Summarizer
        </h1>

        <div
          style={{
            backgroundColor: "#1a1a1a",
            borderRadius: "20px",
            padding: "2rem",
            boxShadow: "0 0 10px #444",
          }}
        >
          <div style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>
            <label>Upload File:</label>
            <br />
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              style={{
                marginTop: "0.5rem",
                color: "white",
                background: "black",
                border: "1px solid yellow",
                padding: "0.3rem",
                borderRadius: "8px",
                width: "90%",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>
            <label>Max Length:</label>
            <br />
            <input
              type="number"
              value={maxLength}
              onChange={(e) => setMaxLength(Number(e.target.value))}
              style={{
                backgroundColor: "#000",
                color: "yellow",
                border: "1px solid yellow",
                padding: "0.4rem",
                borderRadius: "6px",
                width: "60%",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>
            <label>Min Length:</label>
            <br />
            <input
              type="number"
              value={minLength}
              onChange={(e) => setMinLength(Number(e.target.value))}
              style={{
                backgroundColor: "#000",
                color: "yellow",
                border: "1px solid yellow",
                padding: "0.4rem",
                borderRadius: "6px",
                width: "60%",
              }}
            />
          </div>

          <button
            onClick={handleGenerateSummary}
            style={{
              backgroundColor: "blue",
              color: "white",
              fontSize: "1.2rem",
              padding: "0.8rem 1.5rem",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              marginTop: "1rem",
            }}
          >
            ⚡ Generate Summary
          </button>
        </div>

        {summary && (
          <div
            style={{
              marginTop: "2rem",
              fontSize: "1.2rem",
              backgroundColor: "#111",
              padding: "1.5rem",
              borderRadius: "15px",
              color: "white",
              boxShadow: "0 0 10px #444",
            }}
          >
            <strong>Summary:</strong> <br />
            {summary}
          </div>
        )}
      </div>
    </div>
  );
}
