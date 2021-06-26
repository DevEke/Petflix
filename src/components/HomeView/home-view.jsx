import NavBar from '../NavBar/nav-bar';
import { useState } from 'react';
import HeroDisplay from '../HeroDisplay/hero-display';
import './home-view.scss';
import MovieRowList from '../MovieRowList/movie-row-list';

function HomeView(props) {
    const [trailer, setTrailer] = useState(false);

    function toggleTrailer() {
        if (trailer) {
            setTrailer(false);
        } else {
            setTrailer(true);
        }
    }

        const { movies, clearUser } = props;
        return (
            <div className="home-view__container">
                <NavBar 
                    clearUser={clearUser} />
                <HeroDisplay 
                    trailer={trailer} 
                    toggleTrailer={toggleTrailer} />
                <MovieRowList 
                    trailer={trailer} 
                    toggleTrailer={toggleTrailer} 
                    movies={movies} />
            </div>
        )
    
}

export default HomeView;