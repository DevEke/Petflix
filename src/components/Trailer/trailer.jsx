import ReactPlayer from 'react-player';
import { useState } from 'react';
import './trailer.scss';
import { IoArrowBack, IoPaw, IoPawOutline, IoClose } from 'react-icons/io5';

function Trailer(props) {
    const {movie, toggleTrailer } = props;
    const [faved, setFaved] = useState(false);

    function toggleFaved() {
        if (faved) {
            setFaved(false)
        } else {
            setFaved(true)
        }
    }
    return (
        <div className="trailer__wrapper">
                    <div className="movie-trailer__container">
                        <button className="movie-trailer__close-button" onClick={toggleTrailer}>
                            <IoClose className="icon"/>
                        </button>
                        <div className="video-player">
                        <ReactPlayer key={movie.trailerURL} width={"100%"} height={"100%"} light={movie.backdropURL} loop={true} playing={false} image={movie.backdropURL} url={movie.trailerURL}/>
                        </div>
                        <div className="movie__information">
                            <button className="movie-trailer__back-button" onClick={toggleTrailer}>
                                <IoArrowBack className="icon"/>
                            </button>
                            <div className="movie-trailer__title-add">
                                <h1 className="movie-trailer__title">{movie.title}</h1>
                                <button onClick={toggleFaved} className="movie-trailer__button">
                                    { faved ? <IoPaw className="icon"/> : <IoPawOutline className="icon"/>}
                                </button>
                            </div>
                            <p className="movie-trailer__rating">{movie.rating}</p>
                            <div className="scroll">
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
        </div>
    )
}

export default Trailer;