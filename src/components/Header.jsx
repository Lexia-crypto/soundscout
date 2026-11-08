import React from 'react';
import { Headphones, Heart, Search } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext.jsx';

export default function Header() {
  const { favorites } = useFavorites();
  return <header className="topbar"><NavLink to="/" className="brand"><span className="brand-icon"><Headphones size={21}/></span><span>sound<span className="accent">scout</span></span></NavLink>
    <nav><NavLink to="/" end><Search size={16}/> Discover</NavLink><NavLink to="/favorites"><Heart size={16}/> Favorites <span className="count">{favorites.length}</span></NavLink></nav>
  </header>;
}
