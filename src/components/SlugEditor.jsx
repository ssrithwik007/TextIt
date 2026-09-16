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
      if (err.code === '23505') { // unique violation
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
    <div className="flex items-center text-sm font-sans mb-4 mt-2">
      <span className="text-dark-muted select-none">textit.com/c/</span>
      
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          className="ml-1 bg-transparent text-dark-high border-b border-dark-high outline-none w-32 focus:border-b-2"
          value={newSlug}
          onChange={(e) => setNewSlug(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span 
          className="ml-1 text-dark-text hover:text-dark-high cursor-text rounded px-1 -mx-1 hover:bg-dark-sec"
          onClick={() => setEditing(true)}
          title="Click to edit"
        >
          {slug}
        </span>
      )}
      {error && <span className="ml-3 text-red-400 text-xs">{error}</span>}
    </div>
  );
}
