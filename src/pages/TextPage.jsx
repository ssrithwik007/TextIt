import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getText } from '../lib/textService';
import Editor from '../components/Editor';
import SlugEditor from '../components/SlugEditor';
import CopyButton from '../components/CopyButton';

export default function TextPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadText() {
      setLoading(true);
      try {
        const data = await getText(slug);
        if (mounted) {
          if (data) {
            setContent(data.content || '');
          } else {
            navigate('/404', { replace: true });
          }
        }
      } catch (err) {
        if (mounted) {
          console.error(err);
          navigate('/404', { replace: true });
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

    return () => { mounted = false; };
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center flex-grow">
        <span className="text-dark-muted loading-pulse tracking-widest text-sm font-mono">Loading...</span>
      </div>
    );
  }

  if (content === null) return null;

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto w-full p-4 md:py-6 md:px-10 dot-grid">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-3 h-8">
          <h1 className="text-lg font-semibold text-dark-high tracking-tight select-none leading-none">
            TextIt
          </h1>

          <span className="text-dark-border select-none leading-none">
            ·
          </span>

          <SlugEditor slug={slug} />
        </div>

        <CopyButton content={content} />
      </div>

      {/* Thin separator */}
      <div className="h-px bg-dark-border/50 mb-4" />

      <Editor slug={slug} initialContent={content} />
    </div>
  );
}
