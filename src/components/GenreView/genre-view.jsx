import './genre-view.scss';
import {IoArrowBack} from 'react-icons/io5';
import ResultItem from '../ResultItem/result-item';
import {Link} from 'react-router-dom';
import { useState } from 'react';
 

function GenreView(props) {
    const [trailer, setTrailer] = useState(false);


    function toggleTrailer() {
        if (trailer) {
            setTrailer(false);
        } else {
            setTrailer(true);
        }
    }
    const { movies, genre } = props;

    return (
        <div className="results__wrapper">
            <div className="genre__header">
                <Link to="/"><IoArrowBack className="icon"/></Link>
                 <h1 className="results__title">{genre} Movies</h1> 
            </div>
            <div className="results-movie__wrapper">
                {movies.map((movie) => {
                    if (movie.genres.indexOf(genre) > 0) {
                        return (
                            <ResultItem 
                                    className="movie-row__item" 
                                    key={movie._id} 
                                    movie={movie}
                                    toggleTrailer={toggleTrailer}
                                    trailer={trailer}/>
                        )
                    } else {
                        return null
                    }
                })}
                <div className="spacer"/>
            </div>
        </div>
    )
}

export default GenreView;