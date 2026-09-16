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
    <div className="dino-mode w-full max-w-2xl px-6 md:px-8 pb-10 flex flex-col mx-auto">
      <div 
        className="w-11 h-12 mb-6 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded" 
        onClick={handleDinoClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleDinoClick(); }}
        tabIndex="0"
        aria-label="Hidden copy button"
        title={copied ? "Copied" : ""}
      >
        {/* Simple inline SVG resembling the Dino */}
        <svg viewBox="0 0 44 48" className="fill-current text-[#535353] w-full h-full" aria-hidden="true">
          <path d="M22,0 L22,2 L26,2 L26,4 L30,4 L30,6 L38,6 L38,8 L40,8 L40,10 L42,10 L42,14 L44,14 L44,16 L42,16 L42,18 L44,18 L44,20 L42,20 L42,22 L24,22 L24,24 L22,24 L22,26 L20,26 L20,28 L18,28 L18,30 L16,30 L16,40 L18,40 L18,42 L20,42 L20,48 L14,48 L14,44 L12,44 L12,42 L14,42 L14,40 L12,40 L12,38 L10,38 L10,48 L4,48 L4,44 L2,44 L2,42 L4,42 L4,40 L2,40 L2,38 L0,38 L0,36 L2,36 L2,34 L4,34 L4,32 L6,32 L6,28 L4,28 L4,26 L6,26 L6,22 L8,22 L8,20 L10,20 L10,18 L12,18 L12,16 L14,16 L14,10 L16,10 L16,4 L18,4 L18,2 L20,2 L20,0 L22,0 Z M30,4 L32,4 L32,6 L30,6 L30,4 Z" />
        </svg>
      </div>

      <h1 className="text-[24px] text-[#202124] mb-4 font-normal tracking-tight">No internet</h1>
      
      <p className="text-[#5f6368] text-[15px] mb-[30px]">
        Try:
      </p>
      <ul className="list-disc pl-10 text-[#5f6368] text-[15px] space-y-1 mb-6 marker:text-[#5f6368]">
        <li>Checking the network cables, modem, and router</li>
        <li>Reconnecting to Wi-Fi</li>
      </ul>

      <p className="text-[#5f6368] text-[12px] uppercase tracking-wide">
        ERR_INTERNET_DISCONNECTED
      </p>

      {copied && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded text-sm shadow-md transition-opacity duration-300">
          Copied
        </div>
      )}
    </div>
  );
}
