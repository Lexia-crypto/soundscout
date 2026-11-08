import React from 'react';
import { Heart, ExternalLink, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext.jsx';

export default function TrackCard({ track }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const saved = isFavorite(track.trackId);
  const image = track.artworkUrl100?.replace(
    '100x100bb',
    '300x300bb'
  );

  return (
    <article className="track-card">
      <div className="art-wrap">
        <img
          src={image}
          alt={`${track.trackName} album artwork`}
          loading="lazy"
        />

        <button
          className={`favorite-btn ${saved ? 'saved' : ''}`}
          onClick={() => toggleFavorite(track)}
          aria-label={saved ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            size={17}
            fill={saved ? 'currentColor' : 'none'}
          />
        </button>
      </div>

      <div className="track-info">
        <Link
          className="track-title"
          to={`/track/${track.trackId}`}
        >
          {track.trackName || 'Unknown track'}
        </Link>

        <p>{track.artistName || 'Unknown artist'}</p>

        <span>
          {track.collectionName || 'Single'} ·{' '}
          {track.primaryGenreName || 'Music'}
        </span>
      </div>

      <div className="track-actions">
        {track.previewUrl && (
          <a
            className="preview-btn"
            href={track.previewUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Play size={15} />
            Preview 30s
          </a>
        )}

        {track.trackViewUrl && (
          <a
            className="store-link"
            href={track.trackViewUrl}
            target="_blank"
            rel="noreferrer"
          >
            Listen Full Song
            <ExternalLink size={13} />
          </a>
        )}
      </div>
    </article>
  );
}