import React, { useState } from 'react';

const TextInput = ({ setSummary }: { setSummary: (s: string) => void }) => {
  const [text, setText] = useState('');
  const [minLength, setMinLength] = useState(50);
  const [maxLength, setMaxLength] = useState(150);

  const handleSummarize = async () => {
    const formData = new FormData();
    formData.append("text", text);
    formData.append("min_length", minLength.toString());
    formData.append("max_length", maxLength.toString());

    const res = await fetch("http://localhost:8000/summarize/", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setSummary(data.summary);
  };

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} cols={50} placeholder="Enter text to summarize..." />
      <div className="my-2">
        <input type="number" value={minLength} onChange={e => setMinLength(Number(e.target.value))} /> Min Length
        <input type="number" value={maxLength} onChange={e => setMaxLength(Number(e.target.value))} /> Max Length
      </div>
      <button onClick={handleSummarize} className="bg-purple-600 text-white px-3 py-1 rounded">Generate Summary</button>
    </div>
  );
};

export default TextInput;
