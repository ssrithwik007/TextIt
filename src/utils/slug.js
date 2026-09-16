export function generateRandomSlug(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let slug = '';
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < length; i++) {
    slug += chars[randomValues[i] % chars.length];
  }
  return slug;
}

export function isValidSlug(slug) {
  const regex = /^[A-Za-z0-9_-]{3,100}$/;
  return regex.test(slug);
}
