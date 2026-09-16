import { supabase } from './supabase';

export async function createText(slug) {
  const { data, error } = await supabase
    .from('texts')
    .insert([{ slug, content: '' }])
    .select()
    .single();

  if (error) {
    console.error('Error creating text:', error);
    throw error;
  }
  return data;
}

export async function getText(slug) {
  const { data, error } = await supabase
    .from('texts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching text:', error);
    throw error;
  }
  
  return data || null;
}

export async function updateText(slug, content) {
  const { error } = await supabase
    .from('texts')
    .update({ content, updated_at: new Date().toISOString() })
    .eq('slug', slug);

  if (error) {
    console.error('Error updating text:', error);
    throw error;
  }
}

export async function updateSlug(oldSlug, newSlug) {
  const { error } = await supabase
    .from('texts')
    .update({ slug: newSlug, updated_at: new Date().toISOString() })
    .eq('slug', oldSlug);

  if (error) {
    console.error('Error updating slug:', error);
    throw error;
  }
}
