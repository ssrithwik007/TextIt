import { useState, useRef, useEffect } from 'react';
import { updateSlug } from '../lib/textService';
import { isValidSlug } from '../utils/slug';
import { useNavigate } from 'react-router-dom';

export default function SlugEditor({ slug }) {
  const [editing, setEditing] = useState(false);
  const [newSlug, setNewSlug] = useState(slug);
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setNewSlug(slug);
  }, [slug]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const handleSave = async () => {
    const trimmed = newSlug.trim();

    if (trimmed === slug) {
      setEditing(false);
      return;
    }

    if (!isValidSlug(trimmed)) {
      setError('Invalid slug. Use 3+ letters, numbers, or dashes.');
      setTimeout(() => setError(''), 3000);
      setNewSlug(slug);
      setEditing(false);
      return;
    }

    try {
      await updateSlug(slug, trimmed);
      setEditing(false);
      navigate(`/c/${trimmed}`);
    } catch (err) {
      if (err.code === '23505') {
        setError('Slug already exists');
      } else {
        setError("Couldn't update slug");
      }

      setTimeout(() => setError(''), 3000);
      setNewSlug(slug);
      setEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setNewSlug(slug);
      setEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-1 h-8 text-sm font-mono">
      <span className="text-dark-muted/60 select-none leading-none">
        /c/
      </span>

      {editing ? (
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent text-dark-high border-b border-dark-muted
                     outline-none w-40 h-6 p-0 leading-none
                     transition-colors focus:border-dark-high"
          value={newSlug}
          onChange={(e) => setNewSlug(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          aria-label="Edit slug"
        />
      ) : (
        <span
          className="text-dark-text-sec hover:text-dark-high cursor-text
                     rounded px-1.5 py-0.5 -mx-1
                     hover:bg-dark-sec transition-colors duration-150 leading-none"
          onClick={() => setEditing(true)}
          title="Click to edit slug"
        >
          {slug}
        </span>
      )}

      {error && (
        <span className="ml-2 text-red-400/80 text-xs animate-pulse">
          {error}
        </span>
      )}
    </div>
  );
}