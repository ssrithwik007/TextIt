import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-dark-text p-4 dot-grid">
      <span className="text-6xl font-light text-dark-border mb-2 select-none">404</span>
      <p className="text-dark-muted text-sm mb-8">This text doesn't exist.</p>
      <Link
        to="/"
        className="px-5 py-2 text-xs tracking-wide uppercase font-medium border border-dark-border text-dark-text-sec rounded-md hover:bg-dark-sec hover:border-dark-muted hover:text-dark-high transition-all duration-200"
      >
        Create a new text
      </Link>
    </div>
  );
}
