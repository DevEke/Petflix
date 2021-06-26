
import './movie-row.scss';
import MovieRowItem from '../MovieRowItem/movie-row-item';
import { Link } from 'react-router-dom';

function MovieRow(props) {
    const {genre, movies, toggleTrailer, trailer} = props;

    return (
        <div className="movie-row__container">
            <div className="fader"/>
            <Link to={`/${genre}`}><h1 className="movie-row__title">{genre}</h1></Link>
            {/* <div className={position === 0 ? "movie-row__arrows-container left hide" : "movie-row__arrows-container left"}>
                <img className="movie-row__arrow" src={left} alt=""/>
            </div> */}
                <div className="movie-row__movies">
                    {movies.map((movie) => {
                        if (movie.genres.indexOf(genre) > 0) {
                            return (
                                <MovieRowItem 
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
                </div>
            {/* <div className={ position === 100 ? "movie-row__arrows-container right hide" : "movie-row__arrows-container right"}>
                <img className="movie-row__arrow" src={right} alt=""/>
            </div> */}
        </div>
    )
    
}

export default MovieRow;