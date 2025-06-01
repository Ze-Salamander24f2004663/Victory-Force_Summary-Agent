import React, { useState } from "react";

export default function DocumentUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/summarize", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setSummary(data.summary || "No summary returned.");
    } catch (error) {
      console.error("Error:", error);
      setSummary("Failed to get summary.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">AI Document Summarizer</h2>
      <input type="file" onChange={handleFileChange} accept=".pdf,.docx" />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
        Upload & Summarize
      </button>
      {summary && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold">Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

