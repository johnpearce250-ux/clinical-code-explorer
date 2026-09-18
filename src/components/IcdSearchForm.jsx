export default function IcdSearchForm({ searchText, onSearchTextChange, onSubmit }) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Type a diagnosis or code (e.g. asthma, S82.1, diabetes)..."
        value={searchText}
        onChange={(e) => onSearchTextChange(e.target.value)}
        autoFocus
      />
      {searchText && (
        <button 
          type="button" 
          className="clear-btn"
          onClick={() => onSearchTextChange("")}
          title="Clear search"
        >
          ✕
        </button>
      )}
    </form>
  );
}