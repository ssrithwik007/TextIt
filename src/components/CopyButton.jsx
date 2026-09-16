import { useState } from 'react';

export default function CopyButton({ content, onCopy }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      if (onCopy) onCopy();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`px-3 py-1 text-xs rounded border transition-colors focus:outline-none focus:ring-1 focus:ring-dark-high ${
        copied 
          ? 'bg-dark-text text-dark-bg border-dark-text'
          : 'bg-transparent text-dark-text-sec border-dark-border hover:text-dark-high hover:border-dark-muted'
      }`}
      aria-label="Copy to clipboard"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}
