import React, { Component } from 'react';
import axios from 'axios';
import {IoPaw, IoPlay} from 'react-icons/io5';
import Trailer from '../Trailer/trailer';
import './hero-display.scss';
import LoadingHome from '../LoadingHome/loading-home';

class HeroDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movie: {}
        }
    }

    // setMovie = () => {
    //     axios.get('https://petflix.herokuapp.com/movie')
    //         .then((response) => {
    //             this.setState({
    //                 movie: response.data
    //             })
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             console.log(error);
    //         });
    // }

    // componentDidMount() {
    //     this.setMovie();
    // }

    render() {
        const { trailer, toggleTrailer, movie } = this.props;
        return (
            <>
                {movie ? 
                <div className="hero-display__container" style={{backgroundImage: `url(${movie.backdropURL})`}}>
                    <div className="hero-display__movie-information">
                        <div className="info__wrapper">
                            <img className="hero-display__movie-logo" src={movie.logoURL} alt=""/>
                            <p className="hero-display__movie-description text">{movie.description}</p>
                        </div>
                        <button onClick={toggleTrailer} className="btn icon-text">
                            <IoPlay className="icon"/>
                            <p>Play Trailer</p>
                        </button>
                    </div>
                    <div className="hero-display__rating">
                        <p>{movie.rating}</p>
                    </div>
                </div>
                : <LoadingHome/>
                }
                {trailer ?
                <Trailer movie={movie} toggleTrailer={toggleTrailer}/> :
                null }
                
            </>
        )
    }
}

export default HeroDisplay;