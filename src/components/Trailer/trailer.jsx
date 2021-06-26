import ReactPlayer from 'react-player';
import './trailer.scss';
import { IoClose, IoPaw } from 'react-icons/io5';

function Trailer(props) {
    const {movie, toggleTrailer } = props;
    return (
        <div className="trailer__wrapper">
                    <div className="movie-trailer__container">
                        <button className="movie-trailer__close-button" onClick={toggleTrailer}>
                            <IoClose className="icon"/>
                        </button>
                        <div className="video-player">
                        <ReactPlayer key={movie.trailerURL} width={"100%"} height={"100%"} light={movie.backdropURL} volume={0} loop={true} playing={false} image={movie.backdropURL} muted={false} url={movie.trailerURL}/>
                        </div>
                        <div className="movie__information">
                            <div className="movie-trailer__title-add">
                                <h1 className="movie-trailer__title">{movie.title}</h1>
                                <button className="movie-trailer__button">
                                    <IoPaw className="icon"/>
                                </button>
                            </div>
                            <p className="movie-trailer__rating">{movie.rating}</p>
                            <p className="movie-trailer__director">Directed By: {movie.director}</p>
                            <p className="movie-trailer__description">{movie.description}</p>
                            {movie?.genres?.map((genre) => {
                            return (
                                <p className="movie-trailer__genres">{genre}</p>
                            )
                        })}
                    </div>
            </div>
        </div>
    )
}

export default Trailer;