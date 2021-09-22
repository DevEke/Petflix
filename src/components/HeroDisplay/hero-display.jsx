import React, { Component } from 'react';
import { IoPlay} from 'react-icons/io5';
import Trailer from '../Trailer/trailer';
import './hero-display.scss';
import LoadingHome from '../LoadingHome/loading-home';

function HeroDisplay(props) {
    const { movie, loadTrailer } = props;

        
        return (
            <>
                {movie ? 
                <div className="hero-display__container flex clm centered" style={{backgroundImage: `url(${movie.backdropURL})`}}>
                    <div className="hero-display__movie-information">
                        <div className="info__wrapper">
                            <img className="hero-display__movie-logo" src={movie.logoURL} alt=""/>
                            <p className="hero-display__movie-description text">{movie.description}</p>
                        </div>
                        <button onClick={() => loadTrailer(movie)} className="btn display-trailer">
                            <p>Play Trailer</p>
                            <IoPlay className="icon"/>
                        </button>
                    </div>
                    <div className="hero-display__rating">
                        <p>{movie.rating}</p>
                    </div>
                    <div className="hero-fader" />
                </div>
                : <LoadingHome/>
                }
                
            </>
        )
}

export default HeroDisplay;