import React, { Component } from 'react';
import './movie-row-list.scss';
import MovieRow from '../MovieRow/movie-row'; 
import MobileDisplay from '../Mobile-Display/mobile-display';

class MovieRowList extends Component {

    render() {
        const { movies, trailer, toggleTrailer } = this.props;

        return (
            <div className="movie-row-list__container">
                <MovieRow 
                    trailer={trailer} 
                    toggleTrailer={toggleTrailer} 
                    movies={movies} 
                    genre="Animation"/>
                <MobileDisplay
                    trailer={trailer} 
                    toggleTrailer={toggleTrailer} />
                <MovieRow 
                    trailer={trailer} 
                    toggleTrailer={toggleTrailer} 
                    movies={movies} 
                    genre="Family"/>
                <MobileDisplay
                    trailer={trailer} 
                    toggleTrailer={toggleTrailer} />   
                <MovieRow 
                    trailer={trailer} 
                    toggleTrailer={toggleTrailer} 
                    movies={movies} 
                    genre="Drama"/>
                <MobileDisplay
                    trailer={trailer} 
                    toggleTrailer={toggleTrailer} />
                <MovieRow 
                    trailer={trailer} 
                    toggleTrailer={toggleTrailer}
                    movies={movies} 
                    genre="Action"/>
                <MobileDisplay
                    trailer={trailer} 
                    toggleTrailer={toggleTrailer} />
                <MovieRow 
                    trailer={trailer} 
                    toggleTrailer={toggleTrailer} 
                    movies={movies} 
                    genre="Comedy"/> 
            </div>
        )
    }
    
}

export default MovieRowList;