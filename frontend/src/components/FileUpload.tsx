// src/components/FileUpload.tsx
import React, { useState } from 'react';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('min_length', '50');
    formData.append('max_length', '150');

    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/summarize/', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setSummary(data.summary);
      } else {
        setSummary('Error: ' + (data.detail || 'Something went wrong.'));
      }
    } catch (error) {
      console.error(error);
      setSummary('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <input type="file" accept=".pdf,.docx" onChange={handleFileChange} />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        Summarize
      </button>

      {loading && <p className="mt-2 text-yellow-500">Processing...</p>}
      {summary && (
        <div className="mt-4 bg-gray-100 p-3 rounded">
          <h2 className="font-bold text-lg mb-2">Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
