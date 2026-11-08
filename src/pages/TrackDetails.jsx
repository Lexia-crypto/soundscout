import { ArrowLeft, ExternalLink, Heart, Music2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { lookupTrack } from '../services/itunes.js';
import { useFavorites } from '../context/FavoritesContext.jsx';
export default function TrackDetails() {
  const { id } = useParams(); const [track, setTrack] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  const { isFavorite, toggleFavorite } = useFavorites();
  useEffect(() => { let active = true; lookupTrack(id).then((data) => { if (active) setTrack(data); }).catch((err) => { if (active) setError(err.message); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [id]);
  if (loading) return <main className="page-shell inner-page"><p className="loading-message">Loading track details...</p></main>;
  if (error || !track) return <main className="page-shell inner-page"><Link className="back-link" to="/"> <ArrowLeft size={16}/> Back to discover</Link><div className="error-state"><h3>Track unavailable</h3><p>{error || 'This track could not be found.'}</p></div></main>;
  const saved = isFavorite(track.trackId);
  return <main className="page-shell inner-page"><Link className="back-link" to="/"><ArrowLeft size={16}/> Back to discover</Link><section className="detail-panel"><img className="detail-art" src={track.artworkUrl100?.replace('100x100bb', '600x600bb')} alt={`${track.trackName} artwork`}/><div className="detail-copy"><span className="eyebrow"><Music2 size={14}/> TRACK DETAILS</span><h1>{track.trackName}</h1><h2>{track.artistName}</h2><p>{track.collectionName}</p><dl><div><dt>Genre</dt><dd>{track.primaryGenreName || '—'}</dd></div><div><dt>Release date</dt><dd>{track.releaseDate ? new Date(track.releaseDate).toLocaleDateString() : '—'}</dd></div><div><dt>Track length</dt><dd>{track.trackTimeMillis ? `${Math.floor(track.trackTimeMillis / 60000)}:${String(Math.floor((track.trackTimeMillis % 60000) / 1000)).padStart(2, '0')}` : '—'}</dd></div></dl><div className="detail-actions"><button className="primary-btn" onClick={() => toggleFavorite(track)}><Heart size={17} fill={saved ? 'currentColor' : 'none'}/>{saved ? 'Saved to favorites' : 'Add to favorites'}</button>{track.trackViewUrl && <a className="outline-btn" href={track.trackViewUrl} target="_blank" rel="noreferrer">View in iTunes <ExternalLink size={15}/></a>}</div>{track.previewUrl && <audio className="audio-player" controls src={track.previewUrl}>Your browser does not support audio.</audio>}</div></section><p className="api-note">Song preview and artwork are supplied by Apple for promotional use and should remain associated with the iTunes Store link.</p></main>;
}
