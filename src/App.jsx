import { useState, useEffect } from "react";
import IcdSearchForm from "./components/IcdSearchForm";
import IcdResultsList from "./components/IcdResultsList";
import useDebounce from "./hooks/useDebounce"; // <-- Import the hook
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce the input text by 350ms
  const debouncedSearchText = useDebounce(searchText.trim(), 350);

  useEffect(() => {
    // If the input is cleared, clear out results and don't query the API
    if (!debouncedSearchText) {
      setResults([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    // Set up an AbortController so stale inflight requests get canceled
    const controller = new AbortController();

    async function fetchResults() {
      setIsLoading(true);
      setError(null);

      try {
        const url = `https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&terms=${encodeURIComponent(
          debouncedSearchText
        )}&maxList=25`;

        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        const rows = data[3] || [];

        const formattedResults = rows.map(([code, description]) => ({
          code: code,
          description: description,
          category: getCategoryFromCode(code),
          billable: code.length >= 4
        }));

        setResults(formattedResults);
      } catch (err) {
        // Ignore errors caused by canceling previous keystroke queries
        if (err.name === "AbortError") return;

        console.error("Fetch failed:", err);
        setError(err.message || "Something went wrong");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchResults();

    // Cleanup: cancel pending request if a new keystroke arrives
    return () => {
      controller.abort();
    };
  }, [debouncedSearchText]);

  function handleSearchTextChange(newText) {
    setSearchText(newText);
  }

  // Form submit can either be a no-op or trigger an immediate search
  function handleSearchSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
  }

  return (
    <div className="app">
      <div className="app-card">
        <h1>Clinical Code Explorer</h1>
        <p>Search and verify ICD-10-CM diagnostic codes</p>

        <IcdSearchForm
          searchText={searchText}
          onSearchTextChange={handleSearchTextChange}
          onSubmit={handleSearchSubmit}
        />

        <IcdResultsList
          results={results}
          submittedQuery={debouncedSearchText}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}

// Category lookup helper
function getCategoryFromCode(code) {
  if (!code) return "General";
  const prefix = code.charAt(0).toUpperCase();
  const chapterMap = {
    A: "Infectious Diseases",
    B: "Infectious Diseases",
    C: "Neoplasms",
    D: "Blood & Immune Disorders",
    E: "Endocrine & Metabolic",
    F: "Mental & Neurodevelopmental",
    G: "Nervous System",
    H: "Eye, Adnexa & Ear",
    I: "Circulatory System",
    J: "Respiratory System",
    K: "Digestive System",
    L: "Skin & Subcutaneous",
    M: "Musculoskeletal System",
    N: "Genitourinary System",
    O: "Pregnancy & Childbirth",
    P: "Perinatal Conditions",
    Q: "Congenital Malformations",
    R: "Symptoms & Clinical Findings",
    S: "Injury & Poisoning",
    T: "Injury & Poisoning",
    Z: "Factors Influencing Health Status"
  };
  return chapterMap[prefix] || "Clinical Diagnoses";
}

export default App;