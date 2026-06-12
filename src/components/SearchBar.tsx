'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  placeholder?: string;
  style?: React.CSSProperties;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Pesquisar calçado...", 
  style 
}) => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/loja?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form 
      onSubmit={handleSearch} 
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: '50px',
        padding: '6px 12px',
        border: '1.5px solid #eee',
        boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        ...style
      }}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          padding: '4px 8px',
          fontSize: '0.95rem',
          fontFamily: 'var(--font-main)',
          color: 'var(--color-text)',
          background: 'transparent'
        }}
      />
      <button
        type="submit"
        style={{
          background: 'var(--color-primary)',
          border: 'none',
          color: 'var(--color-text)',
          borderRadius: '50%',
          width: '34px',
          height: '34px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'transform 0.2s',
          flexShrink: 0
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        <Search size={16} />
      </button>
    </form>
  );
};
export default SearchBar;
