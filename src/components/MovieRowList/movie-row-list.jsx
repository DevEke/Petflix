import React, { Component } from 'react';
import './movie-row-list.scss';
import MovieRow from '../MovieRow/movie-row'; 

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
                <MovieRow 
                    trailer={trailer} 
                    toggleTrailer={toggleTrailer} 
                    movies={movies} 
                    genre="Family"/>
                <MovieRow 
                    trailer={trailer} 
                    toggleTrailer={toggleTrailer} 
                    movies={movies} 
                    genre="Drama"/>
                <MovieRow 
                    trailer={trailer} 
                    toggleTrailer={toggleTrailer}
                    movies={movies} 
                    genre="Action"/>
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