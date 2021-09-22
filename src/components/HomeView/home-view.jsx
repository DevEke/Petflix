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
import LoadingHome from '../LoadingHome/loading-home';
import Trailer from '../Trailer/trailer';

function HomeView(props) {
    const [displayMovie, setDisplayMovie] = useState(undefined);
    const [query, setQuery] = useState('');
    const [mobileMenu, setMobileMenu] = useState(false);
    const [trailerMovie, setTrailerMovie] = useState(undefined)

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

    function loadTrailer(movie) {
        setTrailerMovie(movie);
    }

    function clearTrailer() {
        setTrailerMovie(undefined)
    }

    function toggleMenu() {
        if (mobileMenu) {
            setMobileMenu(false);
        } else {
            setMobileMenu(true);
        }
    }

    useEffect(() => {
        setMovie();
    }, [])

        const { movies, clearUser } = props;
        return (
            <div style={mobileMenu ? {overflowY: 'hidden'} : {overflowY: 'scroll'}} className="home__wrapper">
            {trailerMovie !== undefined ?
            <Trailer movie={trailerMovie} clearTrailer={clearTrailer} />:
            null
            }
            <Router>
                {mobileMenu ? <MobileMenu toggleMenu={toggleMenu}/> : null}
                <NavBar
                    toggleMenu={toggleMenu}
                    handleClear={handleClear}
                    query={query}
                    setMovie={setMovie}
                    clearUser={clearUser}
                    handleSearch={handleSearch} />
                  {displayMovie === undefined ? 
                    <LoadingHome/> : 
                <Route exact path="/" render={() => {
                    if (query.length >= 1)  
                    return <ResultsView 
                                loadTrailer={loadTrailer} 
                                handleClear={handleClear} 
                                query={query} 
                                movies={movies}/>;
                    return (
                        <div className="home-view__container">
                        <HeroDisplay
                            movie={displayMovie} 
                            loadTrailer={loadTrailer} />
                        <MovieRowList  
                            loadTrailer={loadTrailer} 
                            movies={movies} />
                    </div> 
                    ) 
                }}/>
            }
                <Route path="/:genre" render={({match}) => <GenreView genre={match.params.genre} movies={movies}/>}/>
            </Router>
            </div>
        )
    
}

export default HomeView;