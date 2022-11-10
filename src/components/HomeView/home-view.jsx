import NavBar from '../NavBar/NavBar';
import { useState, useEffect } from 'react';
import './home-view.scss';
import MovieRowList from './MovieScroll/MovieRowList/movie-row-list';
import axios from 'axios';
import ResultsView from '../Results-View/results-view';
import TopScroll from './TopScroll/TopScroll';
import HeroDisplay from './HeroDisplay/HeroDisplay';
import Footer from '../NavBar/Footer';

export default function HomeView({user, account, loadTrailer, clearTrailer, openMobileMenu}) {
    const [displayMovie, setDisplayMovie] = useState(undefined);
    const [query, setQuery] = useState('');
    const [mobileMenu, setMobileMenu] = useState(false);
    const [movies, setMovies] = useState([]);
    const auth = localStorage.getItem('auth');
    const token = localStorage.getItem('token');

    axios.interceptors.request.use(req => {
        req.headers.authorization = token;
        return req;
      });

  const getMovies = () => {
    console.log({message: 'Getting Movies...'})
    axios.get('https://petflix.herokuapp.com/movies')
    .then(res => {
        setMovies(res.data.movies);
    })
    .catch(err => {
        console.log(err.data)
    })
  }


    const setMovie = () => {
        axios.get('https://petflix.herokuapp.com/movie')
            .then((response) => {
                setDisplayMovie(response.data.movie);
            })
            .catch((error) => {
                console.log(error.data);
            });
    }
    const handleSearch = (x) => {
        setQuery(x.target.value)
    }
        
    const handleClear = () => {
        setQuery('');
    }

    

    useEffect(() => {
        getMovies()
        setMovie()
        if (!user, !account) {
            clearTrailer();
        }
    }, [])
        
    return (
        <div className='home-wrapper'>
            <NavBar
                openMobileMenu={openMobileMenu} 
                account={account}
                query={query} 
                handleSearch={(x)=> handleSearch(x)}
                handleClear={() => handleClear()}
            />
            {
            query === '' ?
            <div className='scroll_container'>
            <div className='home-container'>
                <HeroDisplay
                    movies={movies}
                    loadTrailer={() => loadTrailer(displayMovie)} 
                    setMovie={() => setMovie()} 
                    displayMovie={displayMovie}
                />
                <TopScroll 
                    loadTrailer={loadTrailer} 
                    clearTrailer={() => clearTrailer()} 
                    movies={movies}
                />
                <MovieRowList 
                    movies={movies} 
                    loadTrailer={loadTrailer} 
                    clearTrailer={() => clearTrailer()}
                />
            </div>
            </div> :
            <div className='scroll_container'>
                <ResultsView 
                    movies={movies} 
                    query={query} 
                    loadTrailer={loadTrailer}
                />
            </div>
            
            }
            <Footer/>
        </div>
    )
}
