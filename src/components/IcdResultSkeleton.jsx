import React from 'react';

export default function IcdResultSkeleton() {
  return (
    <div className="result-card skeleton-card" aria-hidden="true">
      <div className="card-header">
        <div className="code-badge-group">
          {/* Code pill placeholder */}
          <div className="skeleton skeleton-pill" style={{ width: '80px', height: '24px' }}></div>
          {/* Copy button placeholder */}
          <div className="skeleton skeleton-pill" style={{ width: '50px', height: '24px' }}></div>
        </div>

        {/* Billable status tag placeholder */}
        <div className="skeleton skeleton-pill" style={{ width: '70px', height: '20px' }}></div>
      </div>

      {/* Description line placeholders */}
      <div className="skeleton skeleton-text" style={{ width: '92%', height: '14px', marginBottom: '8px' }}></div>
      <div className="skeleton skeleton-text" style={{ width: '65%', height: '14px', marginBottom: '16px' }}></div>

      <div className="card-footer">
        {/* Category tag placeholder */}
        <div className="skeleton skeleton-pill" style={{ width: '160px', height: '16px' }}></div>
      </div>
    </div>
  );
}