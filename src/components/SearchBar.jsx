import React, { useState } from "react";
import theme from "../styles/theme";

function SearchBar({ onSearch, placeholder = "搜尋..." }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} style={styles.container}>
      <div style={styles.searchWrapper}>
        <span style={styles.searchIcon}>🔍</span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder={placeholder}
          style={styles.input}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            style={styles.clearButton}
            aria-label="清除搜尋"
          >
            ✕
          </button>
        )}
      </div>
    </form>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: "500px",
  },
  searchWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.lg,
    border: `1px solid ${theme.colors.neutral.gray300}`,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    transition: "all 0.3s ease",
  },
  searchIcon: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.secondary,
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    backgroundColor: "transparent",
  },
  clearButton: {
    background: "transparent",
    border: "none",
    color: theme.colors.text.secondary,
    cursor: "pointer",
    padding: theme.spacing.xs,
    fontSize: theme.typography.fontSize.lg,
    lineHeight: 1,
    transition: "color 0.2s ease",
  },
};

export default SearchBar;

