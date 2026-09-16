import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getText } from '../lib/textService';
import DinoErrorPage from '../components/DinoErrorPage';

export default function DinoPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Apply strict body styles that override dark theme completely
    document.body.className = 'bg-white m-0';

    async function loadText() {
      try {
        const data = await getText(slug);
        if (mounted) {
          if (data) {
            setContent(data.content || '');
          } else {
            // Missing note in dino mode should behave appropriately
            setContent(null); 
          }
        }
      } catch (err) {
        if (mounted) {
          setContent(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    if (slug) {
      loadText();
    }

    return () => { 
      mounted = false; 
      document.body.className = ''; // Reset on unmount
    };
  }, [slug, navigate]);

  if (loading) {
    // Return empty string to prevent content flash during loading
    return null; 
  }

  if (content === null) {
    return (
      <div className="dino-mode w-full max-w-2xl px-6 md:px-8 pb-10 flex flex-col mx-auto">
        <h1 className="text-[24px] text-[#202124] mb-4 font-normal tracking-tight">ERR_FILE_NOT_FOUND</h1>
        <p className="text-[#5f6368] text-[15px]">
          The requested text could not be found.
        </p>
      </div>
    );
  }

  return <DinoErrorPage content={content} />;
}
