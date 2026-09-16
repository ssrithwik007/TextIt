import { useEffect, useState, useRef } from 'react';
import { updateText } from '../lib/textService';

export default function Editor({ slug, initialContent }) {
  const [content, setContent] = useState(initialContent);
  const [saveState, setSaveState] = useState(''); // '' | 'Saving...' | 'Saved' | 'Error'
  const saveTimeoutRef = useRef(null);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const saveContent = async (text) => {
    setSaveState('Saving...');
    try {
      await updateText(slug, text);
      setSaveState('Saved');
      setTimeout(() => {
        setSaveState((curr) => (curr === 'Saved' ? '' : curr));
      }, 2000);
    } catch (err) {
      setSaveState("Couldn't save your text. Try again.");
    }
  };

  const handleChange = (e) => {
    const text = e.target.value;
    setContent(text);

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveContent(text);
    }, 700);
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveContent(content);
    }
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex justify-between items-center text-dark-muted text-xs mb-2 h-4 px-2">
         {saveState ? <span>{saveState}</span> : <span></span>}
      </div>
      <textarea
        className="w-full flex-grow p-4 bg-transparent text-dark-text font-mono text-sm border border-dark-border rounded outline-none focus:border-dark-muted resize-none md:p-6"
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Write or paste your text..."
        aria-label="Editor"
        spellCheck="false"
      />
    </div>
  );
}
