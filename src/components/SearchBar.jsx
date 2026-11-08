import React from 'react';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar({ onSearch, initialValue = '' }) {
  const [value, setValue] = useState(initialValue);
  function submit(event) { event.preventDefault(); if (value.trim()) onSearch(value.trim()); }
  return <form className="search-form" onSubmit={submit}><Search size={20}/><input aria-label="Search music" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search songs, artists, albums..."/><button type="submit">Search</button></form>;
}
