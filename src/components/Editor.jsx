import { useEffect, useState, useRef } from 'react';
import { updateText } from '../lib/textService';

export default function Editor({ slug, initialContent }) {
  const [content, setContent] = useState(initialContent);
  const [saveState, setSaveState] = useState(''); // '' | 'Saving...' | 'Saved' | error
  const saveTimeoutRef = useRef(null);
  const textareaRef = useRef(null);

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
    // Ctrl/Cmd + S → immediate save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveContent(content);
      return;
    }

    // Tab → insert tab character instead of moving focus
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = textareaRef.current;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newContent = content.substring(0, start) + '\t' + content.substring(end);
      setContent(newContent);

      // Restore cursor position after the inserted tab
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 1;
      });

      // Trigger debounced save
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(() => {
        saveContent(newContent);
      }, 700);
    }
  };

  // Character and line count
  const lineCount = content ? content.split('\n').length : 0;
  const charCount = content ? content.length : 0;

  return (
    <div className="flex flex-col flex-grow min-h-0">
      <textarea
        ref={textareaRef}
        className="w-full flex-grow p-4 md:p-6 bg-dark-sec/40 text-dark-text font-mono text-sm leading-relaxed border border-dark-border rounded-lg outline-none focus:border-dark-muted/80 resize-none transition-colors duration-200 placeholder:text-dark-muted/50"
        style={{ tabSize: 4 }}
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Write or paste your text..."
        aria-label="Editor"
        spellCheck="false"
      />
      <div className="flex justify-between items-center text-dark-muted text-[11px] mt-2 px-1 h-5 select-none font-mono tracking-wide">
        <span className="opacity-70">{lineCount} lines · {charCount} chars</span>
        <span className={`transition-opacity duration-300 ${saveState ? 'opacity-100' : 'opacity-0'}`}>
          {saveState || 'Saved'}
        </span>
      </div>
    </div>
  );
}
