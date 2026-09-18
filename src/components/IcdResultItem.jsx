import React, { useState } from 'react';

export default function IcdResultItem({ item }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.code);
      setCopied(true);
      // Reset back to normal after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div className="result-card">
      <div className="card-header">
        <div className="code-badge-group">
          <span className="code-pill">{item.code}</span>
          <button 
            type="button"
            className={`copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            title="Copy code to clipboard"
            aria-label={`Copy code ${item.code}`}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>

        <span className={`status-pill ${item.billable ? 'billable' : 'non-billable'}`}>
          {item.billable ? 'Billable' : 'Heading / Non-billable'}
        </span>
      </div>

      <p className="code-description">{item.description}</p>
      
      <div className="card-footer">
        <span className="category-tag">Category: {item.category}</span>
      </div>
    </div>
  );
}
