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

      while (!slugFound) {
        slug = generateRandomSlug(6);
        try {
          const existing = await getText(slug);
          if (!existing) {
            slugFound = true;
          }
        } catch (err) {
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

    return () => { mounted = false; };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center flex-grow gap-4">
      <span className="text-lg font-semibold text-dark-high tracking-tight select-none">TextIt</span>
      <span className="text-dark-muted loading-pulse tracking-widest text-xs font-mono">Creating your note...</span>
    </div>
  );
}
