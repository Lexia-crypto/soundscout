import React from 'react';
import TrackCard from './TrackCard.jsx';

export default function TrackGrid({ tracks }) {
  if (!tracks.length) return <div className="empty-state"><div className="empty-icon">♫</div><h3>No music found</h3><p>Try another keyword or change the genre filter.</p></div>;
  return <div className="track-grid">{tracks.map((track) => <TrackCard key={track.trackId} track={track}/>)}</div>;
}
