import './results-view.scss';
import { IoArrowBack } from 'react-icons/io5';
import ResultItem from '../ResultItem/result-item';
import {Link} from 'react-router-dom';
import { useState } from 'react';
 

function ResultsView(props) {
    const [trailer, setTrailer] = useState(false);


    function toggleTrailer() {
        if (trailer) {
            setTrailer(false);
        } else {
            setTrailer(true);
        }
    }
    const { movies, query } = props;
    let filteredMovies = movies;
    const cased = query.toLowerCase();
    
    if (query !== '') {
        filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(cased))
    }
    if (!movies) return null;

    return (
        <div className="results__wrapper">
            <div className="genre__header">
                <Link to="/"><IoArrowBack className="icon"/></Link>
                 <h1 className="results__title">Search Results</h1> 
            </div>
            {filteredMovies.length === 0 ?
            <div className="no-results">
                <h1>No Results</h1>
                <p>Search Again</p>
            </div> :
            <div className="results-movie__wrapper">
                {filteredMovies.map((movie) => {
                    return (
                        <ResultItem 
                                className="movie-row__item" 
                                key={movie._id} 
                                movie={movie}
                                toggleTrailer={toggleTrailer}
                                trailer={trailer}/>
                    )
                })}
                <div className="spacer"/>
            </div>}
        </div>
    )
}

export default ResultsView;