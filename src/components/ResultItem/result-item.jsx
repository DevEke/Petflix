import { useState } from 'react';
import './result-item.scss';
import Trailer from '../Trailer/trailer';

function MovieRowItem(props) {
    const [trailer, setTrailer] = useState(false);


    function toggleTrailer() {
        if (trailer) {
            setTrailer(false);
        } else {
            setTrailer(true);
        }
    }
    const {movie} = props;

    return (
            <>
                <div 
                    style={{backgroundImage: `url(${movie.posterURL})`}} 
                    onClick={toggleTrailer} 
                    className="result__item-mobile">
                </div>
                <div 
                    onClick={toggleTrailer}
                    className="result__item"
                    style={{backgroundImage: `url(${movie.backdropURL})`}}>
                 <img src={`${movie.logoURL}`} alt="" className="movie-logo"/>       
                </div>
                {trailer ? 
                <Trailer movie={movie} toggleTrailer={toggleTrailer}/> :
                null}
            </>
       
    )
}

export default MovieRowItem;