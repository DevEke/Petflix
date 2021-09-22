import { useState } from 'react';
import './result-item.scss';
import Trailer from '../Trailer/trailer';

function MovieRowItem(props) {

    const {movie, loadTrailer} = props;

    return (
            <>
                <div 
                    style={{backgroundImage: `url(${movie.posterURL})`}} 
                    className="result__item-mobile">
                </div>
                <div 
                    className="result__item"
                    onClick={() => loadTrailer(movie)}
                    style={{backgroundImage: `url(${movie.backdropURL})`}}>
                 <img src={`${movie.logoURL}`} alt="" className="movie-logo"/>       
                </div>
            </>
       
    )
}

export default MovieRowItem;