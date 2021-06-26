import { useState } from 'react';
import './movie-row-item.scss';
import Trailer from '../Trailer/trailer';
import {IoPlay} from 'react-icons/io5';

function MovieRowItem(props) {
    const [trailer, setTrailer] = useState(false);
    const [details, setDetails] = useState(false);


    function toggleTrailer() {
        if (trailer) {
            setTrailer(false);
        } else {
            setTrailer(true);
            setDetails(false);
        }
    }

    function expandDetails() {
        setDetails(true);
    }

    function compressDetails() {
        setDetails(false);
    }

    const {movie} = props;

    const expandedBackdrop = {
        backgroundImage: `url(${movie.backdropURL})`,
        transform: `scale(1.2, 1.2)`,
        borderRadius: `3px 3px 0 0`,
        zIndex: `999`,
        bottom: `100px`,
        boxShadow: `0px 0px 8px 3px rgba(0,0,0,0.7)`
    }

    const expandedDetails = {
        display: `block`
    }

    return (
            <>
                <div onMouseEnter={expandDetails} onMouseLeave={compressDetails} onClick={toggleTrailer}  className="movie-row-item__backdrop" style={details ? expandedBackdrop : {backgroundImage: `url(${movie.backdropURL})`}}>
                    <img className="movie-row-item__logo" src={movie.logoURL} alt=""/>
                    <div style={details ? expandedDetails : null } className="movie-row-item__information">
                        
                        <div className="movie-row-item__title-rating">
                            <h1 className="movie-row-item__information-title">{movie.title}</h1>
                            <small className="movie-row-item__information-rating">{movie.rating}</small>
                        </div>
                        <p className="movie-row-item__information-description">{movie.description}</p>
                        {movie.genres.map((genre) => {
                            return (
                                <p className="movie-row-item__information-genre">{genre}</p>
                            )
                        })}
                        <button onClick={toggleTrailer} className="btn icon-text">
                            <IoPlay className="icon"/>
                            <p>Play Trailer</p>  
                        </button>
                    </div>
                </div>
                <div style={{backgroundImage: `url(${movie.posterURL})`}} onClick={toggleTrailer} className="movie-row-item__backdrop-mobile"/>
                {trailer ? 
                <Trailer movie={movie} toggleTrailer={toggleTrailer}/> :
                null}
                {/* <div className={trailer ? "movie__trailer showing" : "movie__trailer hidden"}>
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
                                <button className="movie-trailer__button"></button>
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
                </div> */}
            </>
       
    )
}

export default MovieRowItem;