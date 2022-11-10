import React, { Component } from 'react';
import './movie-row-list.scss';
import MovieRow from '../MovieRow/movie-row'; 

class MovieRowList extends Component {

    render() {
        const { movies, loadTrailer } = this.props;

        return (
            <section id='genres'>
                <div className='genres-header_main section-container'>
                    <h1 className='genres-title_main'>Browse</h1>
                </div>
            <div className="movie-row-list__container">
                <MovieRow 
                    loadTrailer={loadTrailer}
                    movies={movies} 
                    genre="Animation"/>
                <MovieRow  
                    loadTrailer={loadTrailer}
                    movies={movies} 
                    genre="Family"/>
                <MovieRow 
                    loadTrailer={loadTrailer}
                    movies={movies} 
                    genre="Drama"/>
                <MovieRow  
                    loadTrailer={loadTrailer}
                    movies={movies} 
                    genre="Action"/>
                <MovieRow 
                    loadTrailer={loadTrailer} 
                    movies={movies} 
                    genre="Comedy"/>
            </div>
            </section>
        )
    }
    
}

export default MovieRowList;