
import React, { useEffect, useMemo, useState } from 'react';
import { Music2, SlidersHorizontal } from 'lucide-react';
import SearchBar from '../components/SearchBar.jsx';
import TrackGrid from '../components/TrackGrid.jsx';
import Pagination from '../components/Pagination.jsx';
import { searchMusic } from '../services/itunes.js';

const PAGE_SIZE = 12;

export default function Home() {
  const [term, setTerm] = useState('Taylor Swift');
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [genre, setGenre] = useState('All genres');
  const [sort, setSort] = useState('relevance');
  const [page, setPage] = useState(1);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let active = true;

    async function loadMusic() {
      setLoading(true);
      setError('');

      try {
        const results = await searchMusic(term);

        if (active) {
          setTracks(results);
        }
      } catch (err) {
        if (active) {
          setTracks([]);
          setError(
            err.message || 'Something went wrong. Please try again.'
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadMusic();

    return () => {
      active = false;
    };
  }, [term, retryCount]);

  const genres = useMemo(() => {
    const availableGenres = tracks
      .map((track) => track.primaryGenreName)
      .filter(Boolean);

    return [
      'All genres',
      ...new Set(availableGenres.sort()),
    ];
  }, [tracks]);

  const filtered = useMemo(() => {
    const result = tracks.filter(
      (track) =>
        genre === 'All genres' ||
        track.primaryGenreName === genre
    );

    if (sort === 'title') {
      result.sort((a, b) =>
        (a.trackName || '').localeCompare(b.trackName || '')
      );
    }

    if (sort === 'artist') {
      result.sort((a, b) =>
        (a.artistName || '').localeCompare(b.artistName || '')
      );
    }

    if (sort === 'newest') {
      result.sort(
        (a, b) =>
          new Date(b.releaseDate || 0) -
          new Date(a.releaseDate || 0)
      );
    }

    return result;
  }, [tracks, genre, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PAGE_SIZE)
  );

  const visible = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  function handleSearch(value) {
    setPage(1);
    setGenre('All genres');
    setTerm(value);
  }

  function changeGenre(value) {
    setGenre(value);
    setPage(1);
  }

  function changeSort(value) {
    setSort(value);
    setPage(1);
  }

  function handleRetry() {
    setRetryCount((count) => count + 1);
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <Music2 size={14} />
            YOUR NEXT FAVORITE SONG STARTS HERE
          </span>

          <h1>
            Find your
            <br />
            <span>soundtrack.</span>
          </h1>

          <p>
            Explore millions of songs, albums, and artists
            with music data from the iTunes Store.
          </p>
        </div>

        <div className="hero-orb orb-one">♫</div>
        <div className="hero-orb orb-two">♪</div>

        <div className="hero-disc">
          <div />
        </div>
      </section>

      <section className="discover-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE MUSIC CATALOG</span>
            <h2>Discover music</h2>
          </div>

          <span className="result-total">
            {loading
              ? 'Searching...'
              : `${filtered.length.toLocaleString()} results`}
          </span>
        </div>

        <SearchBar
          onSearch={handleSearch}
          initialValue="Taylor Swift"
        />

        <div className="filters">
          <span>
            <SlidersHorizontal size={15} />
            Filter & sort
          </span>

          <select
            aria-label="Filter by genre"
            value={genre}
            onChange={(event) => changeGenre(event.target.value)}
          >
            {genres.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            aria-label="Sort results"
            value={sort}
            onChange={(event) => changeSort(event.target.value)}
          >
            <option value="relevance">Sort: Relevance</option>
            <option value="title">Sort: Song title A–Z</option>
            <option value="artist">Sort: Artist A–Z</option>
            <option value="newest">Sort: Newest first</option>
          </select>
        </div>

        {loading ? (
          <div className="loading-grid">
            {Array.from({ length: 8 }).map((_, index) => (
              <div className="skeleton" key={index}>
                <div />
                <span />
                <span />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="error-state">
            <h3>We couldn't load the music</h3>
            <p>{error}</p>
            <button onClick={handleRetry}>
              Try again
            </button>
          </div>
        ) : (
          <>
            <TrackGrid tracks={visible} />

            {filtered.length > 0 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={setPage}
              />
            )}
          </>
        )}
      </section>

      <footer>
        Music data provided by the{' '}
        <a
          href="https://performance-partners.apple.com/search-api"
          target="_blank"
          rel="noreferrer"
        >
          iTunes Search API
        </a>
        . Previews and artwork are promotional store content.
      </footer>
    </main>
  );
}
