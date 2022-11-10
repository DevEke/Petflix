import { useState } from 'react';
import './movie-row-item.scss';

function MovieRowItem(props) {
    const {movie , loadTrailer, width} = props;
    const [details, setDetails] = useState(false);

    function expandDetails() {
        setDetails(true);
    }

    function compressDetails() {
        setDetails(false);
    }

    

    const expandedBackdrop = {
        backgroundImage: `url(${movie.backdropURL})`,
        transform: `scale(1.2, 1.2)`,
        borderRadius: `10px 10px 0 0`,
        zIndex: `999`,
        bottom: `100px`,
        boxShadow: `0px 0px 8px 3px rgba(0,0,0,0.7)`
    }

    const expandedDetails = {
        display: `block`,
        zIndex: `999`,
    }

    return (
            <>
                <div 
                    onMouseEnter={expandDetails} 
                    onMouseLeave={compressDetails} 
                    // onClick={() => loadTrailer(movie)}  
                    className="movie-row-item__backdrop" 
                    style={details ? expandedBackdrop : {
                        backgroundImage: `url(${movie.backdropURL})`,
                        width: `${width}px`
                        }
                    }>
                    <img className="movie-row-item__logo" src={movie.logoURL} alt=""/>
                    <div style={details ? expandedDetails : null } className="movie-row-item__information">
                        
                        <div className="movie-row-item__title-rating">
                            <h1 className="movie-row-item__information-title">{movie.title}</h1>
                            <small className="movie-row-item__information-rating">{movie.rating}</small>
                        </div>
                        <p className="movie-row-item__information-description">{movie.description}</p>
                        {movie.genres.map((genre, i) => {
                            return (
                                <p key={i} className="movie-row-item__information-genre">{genre}</p>
                            )
                        })}
                    </div>
                </div>
                <div style={{backgroundImage: `url(${movie.posterURL})`}} onClick={() => loadTrailer(movie)} className="movie-row-item__backdrop-mobile"/>
            </>
       
    )
}

export default MovieRowItem;