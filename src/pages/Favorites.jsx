import { Heart } from 'lucide-react';
import TrackGrid from '../components/TrackGrid.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';
export default function Favorites() {
  const { favorites } = useFavorites();
  return <main className="page-shell inner-page"><div className="page-title"><span className="eyebrow"><Heart size={14}/> YOUR COLLECTION</span><h1>Favorite <span>tracks.</span></h1><p>Your saved music stays here, even after you close or refresh the page.</p></div><div className="section-heading compact"><h2>Saved music</h2><span className="result-total">{favorites.length} saved</span></div><TrackGrid tracks={favorites}/></main>;
}
