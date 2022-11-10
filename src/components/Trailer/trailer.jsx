import ReactPlayer from 'react-player';
import { useState } from 'react';
import './trailer.scss';
import { IoArrowBack, IoPaw, IoPawOutline, IoClose } from 'react-icons/io5';

function Trailer(props) {
    const {movie, clearTrailer, addToFavorites, removeFromFavorites, account } = props;
    const [ refresh, setRefresh] = useState({});

    const handleRefresh = () => {
        setRefresh({})
    }
 
    const checkFavorite = (movie) => {
        return account?.favorites.includes(movie);
    }

    const handleAdd = (id) => {
        addToFavorites(id);
        handleRefresh()
    }

    const handleRemove = (id) => {
        removeFromFavorites(id);
        handleRefresh();
    }

    return (
        <div className="trailer__wrapper">
                    <div className="movie-trailer__container">
                        <div className='movie-trailer_header'>
                            {
                                checkFavorite(movie._id) ?
                                <button onClick={() => handleRemove(movie._id)} className="btn">
                                <div className='btn_contents'>
                                <span>Remove From Favoritces</span>
                                <IoPaw className="icon"/>
                                </div>
                            </button>:
                        <button onClick={() => handleAdd(movie._id)} className="btn">
                        <div className='btn_contents'>
                        <span>Add to Favoritces</span>
                        <IoPaw className="icon"/>
                        </div>
                        
                    </button>
                                
                            }
                        
                        <button className="movie-trailer__close-button" onClick={clearTrailer}>
                            <IoClose className="icon"/>
                        </button>
                        </div>
                        
                        <div className="video-player">
                        <ReactPlayer key={movie.trailerURL} width={"100%"} height={"100%"} light={movie.backdropURL} loop={true} playing={false} image={movie.backdropURL} url={movie.trailerURL}/>
                        </div>
                        <div className="movie__information">
                            <button className="movie-trailer__back-button" onClick={clearTrailer}>
                                <IoArrowBack className="icon"/>
                            </button>
                            <div className="movie-trailer__title-add">
                                <h1 className="movie-trailer__title">{movie.title}</h1>
                                <p className="movie-trailer__rating">{movie.rating}</p>
                            </div>
                            
                            <div className="scroll">
                            <p className="movie-trailer__director">Directed By: {movie.director}</p>
                            <p className="movie-trailer__description">{movie.description}</p>
                                {movie?.genres?.map((genre) => {
                                    return (
                                        <p key={genre} className="movie-trailer__genres">{genre}</p>
                                    )
                                })}
                            </div>
                    </div>
            </div>
        </div>
    )
}

export default Trailer;