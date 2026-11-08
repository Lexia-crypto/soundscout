
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ onSearch, initialValue = '' }) {
  const [value, setValue] = useState(initialValue);

  function submit(event) {
    event.preventDefault();

    const query = value.trim();

    if (query) {
      onSearch(query);
    }
  }

  function clearSearch() {
    setValue('');
  }

  return (
    <form className="search-form" onSubmit={submit}>
      <Search size={20} />

      <input
        type="search"
        aria-label="Search music"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search songs, artists, albums..."
      />

      {value && (
        <button
          type="button"
          className="clear-search"
          onClick={clearSearch}
          aria-label="Clear search"
        >
          <X size={17} />
        </button>
      )}

      <button
        type="submit"
        disabled={!value.trim()}
      >
        Search
      </button>
    </form>
  );
}
