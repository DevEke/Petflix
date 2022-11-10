
import './result-item.scss';

function MovieRowItem(props) {

    const {movie, loadTrailer} = props;

    return (
            <>
                <div
                    onClick={() => loadTrailer(movie)} 
                    style={{backgroundImage: `url(${movie.posterURL})`}} 
                    className="result__item-mobile">
                </div>
                <div 
                    className="result__item"
                    onClick={() => loadTrailer(movie)}
                    style={{backgroundImage: `url(${movie.posterURL})`}}>
                </div>
                <div className='result_info_container'>
                    <p>{movie.title}</p>
                    <p className='rating'>{movie.rating}</p>
                </div>  
            </>
       
    )
}

export default MovieRowItem;