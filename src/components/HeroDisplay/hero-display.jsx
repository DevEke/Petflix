import React, { Component } from 'react';
import axios from 'axios';
import {IoPaw, IoPlay} from 'react-icons/io5';
import Trailer from '../Trailer/trailer';
import './hero-display.scss';

class HeroDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movie: {}
        }
    }

    componentDidMount() {
        axios.get('https://petflix.herokuapp.com/movie')
            .then((response) => {
                this.setState({
                    movie: response.data
                })
            })
            .catch((error) => {
                console.error(error);
                console.log(error);
            });
    }

    render() {
        const { movie } = this.state;
        const { trailer, toggleTrailer } = this.props;
        return (
            <>
                <div className="hero-display__container" style={{backgroundImage: `url(${movie.backdropURL})`}}>
                    <div className="hero-display__movie-information">
                        <div className="info__wrapper">
                            <img className="hero-display__movie-logo" src={movie.logoURL} alt=""/>
                            <p className="hero-display__movie-description text">{movie.description}</p>
                        </div>
                        <div className="hero-display__control-buttons">
                            <button onClick={toggleTrailer} className="btn icon-text">
                                <IoPlay className="icon"/>
                                <p>Play Trailer</p>
                            </button>
                        </div>
                    </div>
                    <div className="hero-display__rating">
                        <IoPaw className="icon"/>
                        <p>{movie.rating}</p>
                    </div>
                </div>
                {trailer ?
                <Trailer movie={movie} toggleTrailer={toggleTrailer}/> :
                null }
            </>
        )
    }
}

export default HeroDisplay;