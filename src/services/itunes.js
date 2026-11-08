const BASE_URL = 'https://itunes.apple.com';

export async function searchMusic(term, entity = 'song', country = 'ph') {
  const params = new URLSearchParams({ term, media: 'music', entity, country, limit: '200' });
  const response = await fetch(`${BASE_URL}/search?${params.toString()}`);
  if (!response.ok) throw new Error(`iTunes request failed (${response.status}). Please try again.`);
  const data = await response.json();
  return Array.isArray(data.results) ? data.results : [];
}

export async function lookupTrack(id) {
  const params = new URLSearchParams({ id: String(id), country: 'ph' });
  const response = await fetch(`${BASE_URL}/lookup?${params.toString()}`);
  if (!response.ok) throw new Error(`Unable to load track (${response.status}).`);
  const data = await response.json();
  return data.results?.[0] ?? null;
}
