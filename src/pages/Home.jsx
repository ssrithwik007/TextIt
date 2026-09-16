import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateRandomSlug } from '../utils/slug';
import { createText, getText } from '../lib/textService';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    async function initNote() {
      let slugFound = false;
      let slug = '';
      
      // Ensure unique slug
      while (!slugFound) {
        slug = generateRandomSlug(6);
        try {
          const existing = await getText(slug);
          if (!existing) {
            slugFound = true;
          }
        } catch (err) {
          // If error is not found, assume it's safe or we have an issue
          slugFound = true; 
        }
      }

      if (mounted) {
        try {
          await createText(slug);
          navigate(`/c/${slug}`, { replace: true });
        } catch (err) {
          console.error('Failed to create initial note:', err);
        }
      }
    }

    initNote();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  return (
    <div className="flex items-center justify-center flex-grow">
      <span className="text-dark-muted">Loading...</span>
    </div>
  );
}
