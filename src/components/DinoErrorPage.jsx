import { useState } from 'react';

export default function DinoErrorPage({ content }) {
  const [copied, setCopied] = useState(false);

  const handleDinoClick = async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <div className="dino-mode">
      <div className="w-full max-w-2xl px-6 md:px-8 pb-10 flex flex-col">
        {/* Dino image — click to copy */}
        <div
          className="mb-4 cursor-pointer outline-none rounded"
          style={{ width: 200 }}
          onClick={handleDinoClick}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleDinoClick(); }}
          tabIndex="0"
          role="button"
          aria-label="Hidden copy button"
        >
          <img
            src="/dino.png"
            alt=""
            className="w-full h-auto select-none pointer-events-none"
            draggable="false"
            aria-hidden="true"
          />
        </div>

        <h1
          style={{
            fontSize: 24,
            color: '#202124',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            marginBottom: 8
          }}
        >
          No internet
        </h1>

        <p style={{ color: '#5f6368', fontSize: 15, marginBottom: 24 }}>
          Try:
        </p>

        <ul
          style={{
            color: '#5f6368',
            fontSize: 15,
            paddingLeft: 40,
            lineHeight: 1.8,
            marginBottom: 24
          }}
        >
          <li>Checking the network cables, modem, and router</li>
          <li>Reconnecting to Wi-Fi</li>
        </ul>

        <p
          style={{
            color: '#5f6368',
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          ERR_INTERNET_DISCONNECTED
        </p>

        {/* Subtle toast feedback */}
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#323232] text-white text-sm px-5 py-2.5 rounded-lg shadow-lg transition-all duration-300 ${
            copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          Copied
        </div>
      </div>
    </div>
  );
}
