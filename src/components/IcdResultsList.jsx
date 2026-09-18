import React from 'react';
import IcdResultItem from './IcdResultItem';
import IcdResultSkeleton from './IcdResultSkeleton';

export default function IcdResultsList({ results, submittedQuery, isLoading, error }) {
  // If there's an error, display it clearly
  if (error) {
    return <div className="status-message error">⚠️ {error}</div>;
  }

  // SKELETON LOADING STATE:
  // Render 3 skeleton cards while the API request is inflight
  if (isLoading) {
    return (
      <div className="results-container">
        {submittedQuery && (
          <p className="results-count skeleton-text-label">
            Searching for <strong>"{submittedQuery}"</strong>...
          </p>
        )}
        <div className="results-list">
          <IcdResultSkeleton />
          <IcdResultSkeleton />
          <IcdResultSkeleton />
        </div>
      </div>
    );
  }

  // Empty state when search produces 0 matches
  if (submittedQuery && results.length === 0) {
    return (
      <div className="status-message empty">
        No ICD-10 diagnostic codes found matching <strong>"{submittedQuery}"</strong>.
      </div>
    );
  }

  // Default state before any query is typed
  if (!submittedQuery) {
    return (
      <div className="status-message hint">
        Type a medical condition, symptom, or code prefix above to begin searching.
      </div>
    );
  }

  // Active results list
  return (
    <div className="results-container">
      <p className="results-count">
        Found {results.length} results for <strong>"{submittedQuery}"</strong>:
      </p>

      <div className="results-list">
        {results.map((item) => (
          <IcdResultItem key={item.code} item={item} />
        ))}
      </div>
    </div>
  );
}