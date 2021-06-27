import NavBar from '../NavBar/nav-bar';
import { useState, useEffect } from 'react';
import HeroDisplay from '../HeroDisplay/hero-display';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import './home-view.scss';
import MovieRowList from '../MovieRowList/movie-row-list';
import GenreView from '../GenreView/genre-view';
import axios from 'axios';
import ResultsView from '../Results-View/results-view';
import MobileMenu from '../MobileMenu/mobile-menu';

function HomeView(props) {
    const [trailer, setTrailer] = useState(false);
    const [displayMovie, setDisplayMovie] = useState(undefined);
    const [query, setQuery] = useState('');
    const [mobileMenu, setMobileMenu] = useState(false);

    function setMovie() {
        axios.get('https://petflix.herokuapp.com/movie')
            .then((response) => {
                setDisplayMovie(response.data);
            })
            .catch((error) => {
                console.error(error);
                console.log(error);
            });
    }

    function handleSearch(x) {
        setQuery(x.target.value)
    }

    function handleClear() {
        setQuery('');
    }

    function toggleTrailer() {
        if (trailer) {
            setTrailer(false);
        } else {
            setTrailer(true);
        }
    }

    function toggleMenu() {
        if (mobileMenu) {
            setMobileMenu(false);
        } else {
            setMobileMenu(true);
        }
    }

    function closeTrailer() {
        setTrailer(false);
    }

    useEffect(() => {
        setMovie();
    }, [])

        const { movies, clearUser } = props;
        return (
            <div style={mobileMenu ? {overflowY: 'hidden'} : {overflowY: 'scroll'}} className="home__wrapper">
            <Router>
                {mobileMenu ? <MobileMenu toggleMenu={toggleMenu}/> : null}
                <NavBar
                    toggleMenu={toggleMenu}
                    handleClear={handleClear}
                    query={query}
                    setMovie={setMovie}
                    closeTrailer={closeTrailer}
                    clearUser={clearUser}
                    handleSearch={handleSearch} />
                <Route exact path="/" render={() => {
                    if (query.length >= 1)  
                    return <ResultsView query={query} movies={movies}/>;
                    return (
                        <div className="home-view__container">
                        <HeroDisplay
                            movie={displayMovie} 
                            trailer={trailer} 
                            toggleTrailer={toggleTrailer} />
                        <MovieRowList 
                            trailer={trailer} 
                            toggleTrailer={toggleTrailer} 
                            movies={movies} />
                    </div> 
                    ) 
                }}/>
                <Route path="/:genre" render={({match}) => <GenreView genre={match.params.genre} movies={movies}/>}/>
            </Router>
            </div>
        )
    
}

export default HomeView;