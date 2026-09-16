import { useState } from 'react';

export default function CopyButton({ content }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`group relative px-4 py-1.5 text-xs font-medium tracking-wide uppercase rounded-md border transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-dark-muted ${
        copied
          ? 'bg-dark-high text-dark-bg border-dark-high scale-[0.97]'
          : 'bg-transparent text-dark-text-sec border-dark-border hover:text-dark-high hover:border-dark-muted hover:bg-dark-sec active:scale-[0.97]'
      }`}
      aria-label="Copy to clipboard"
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
}
