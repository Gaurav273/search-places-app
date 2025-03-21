import React, { useRef, useEffect } from "react";

interface SearchBoxProps {
  query: string;
  onChange: (value: string) => void;
  onSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ query, onChange, onSearch }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      value={query}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onSearch}
      className="search-input"
      placeholder="Search places..."
    />
  );
};

export default SearchBox;
