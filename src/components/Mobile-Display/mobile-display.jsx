import axios from 'axios';
import {useEffect, useState} from 'react';
import Trailer from '../Trailer/trailer';
import './mobile-display.scss';

function MobileDisplay(props) {
    const [displayMovie, setDisplayMovie] = useState({});
    const [trailer, setTrailer] = useState(false);

    function setMovie() {
        axios.get('https://petflix.herokuapp.com/movie')
            .then((response) => {
                setDisplayMovie(response.data);
            })
            .catch((error) => {
                console.error(error);
                console.log(error);
            });
    }
    function toggleTrailer() {
        if (trailer) {
            setTrailer(false);
        } else {
            setTrailer(true);
        }
    }
    useEffect(() => {
        setMovie();
    },[])

    return (
        <>
        <div onClick={toggleTrailer}  className="mobile-display" style={{backgroundImage: `url(${displayMovie.backdropURL})`}}>
            <div className="fader top"/>
            <div className="fader bottom"/>
            <img src={displayMovie.logoURL} alt=""/>
        </div>
        {trailer ? 
            <Trailer movie={displayMovie} toggleTrailer={toggleTrailer}/> :
        null}
        </>
    )
}


export default MobileDisplay;
