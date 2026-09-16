import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-dark-text p-4">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-dark-muted mb-8">This text doesn't exist.</p>
      <Link 
        to="/" 
        className="px-4 py-2 border border-dark-border text-dark-text rounded hover:bg-dark-sec hover:border-dark-muted transition-colors"
      >
        Create a new text
      </Link>
    </div>
  );
}
