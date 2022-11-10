import { useState, useEffect } from 'react';
import axios from 'axios';
import './favorites-view.scss';

export default function FavoritesItem({movie, loadTrailer}) {
    const [thisMovie, setThisMovie] = useState(undefined);


    const getMovie = () => {
        axios.get(`https://petflix.herokuapp.com/movie/${movie}`)
        .then((res) => {
            const data = res.data;
            setThisMovie(data.movie);
        })
        .catch((err) => {
            console.log(err.response.data)
        })
    }


    useEffect(() => {
        if (!thisMovie) {
            getMovie()
        }
    }, [thisMovie])

    return (
        <div className="favorites-item_wrapper">
            {
                !thisMovie ?
                <div className='favorites_loading'/> :
                <>
                <div 
                    className="favorites-item"
                    onClick={() => loadTrailer(thisMovie)}
                    style={{backgroundImage: `url(${thisMovie?.posterURL})`}}>
                </div>
                <div className='favorites-item_info_container'>
                    <p>{thisMovie?.title}</p>
                    <p className='rating'>{thisMovie?.rating}</p>
                </div> 
                </>
            }
            
        </div>
    )
}