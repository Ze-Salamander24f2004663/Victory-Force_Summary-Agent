import React from 'react';

const SummaryDisplay = ({ summary }: { summary: string }) => (
  <div className="mt-4 p-4 border rounded bg-gray-50">
    <h2 className="text-xl font-semibold mb-2">Summary:</h2>
    <p>{summary || "Your summary will appear here..."}</p>
  </div>
);

export default SummaryDisplay;
