
import './movie-row.scss';
import MovieRowItem from '../MovieRowItem/movie-row-item';
import { Link } from 'react-router-dom';
import {IoArrowForward, IoArrowBack} from 'react-icons/io5';
import {useRef  , useEffect, useState} from 'react';

function MovieRow(props) {
    const {genre, movies, loadTrailer} = props;
    const [count, setCount] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [windowWidth, setWindowWidth] =useState(window.innerWidth)
    const [calc, setCalc] = useState(scrollPosition/windowWidth)

    const ref = useRef();

    const leftScroll = (offset) => {
        setCount(count+1);
        console.log(count);
        console.log('clieck')
        setScrollPosition(Math.round(scrollPosition-offset));
        console.log(limit);
    }

    const rightScroll = (offset) => {
        setCount(count-1);
        console.log(count);
        console.log('clieck')
        setScrollPosition(Math.round(scrollPosition+offset));
        console.log(limit);
    }

    const handleResize = (e) => {
        setWindowWidth(window.innerWidth)
    }

    const limit = document.getElementById(`${genre}`)?.childElementCount - 4;

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        setCalc(scrollPosition/windowWidth);
        console.log();
    },[scrollPosition, windowWidth, movies, genre])

    return (
        <div className="movie-row__container">
            <div className="fader"/>
            {count === limit-1 ?
            null : 
            <div 
            onClick={calc > -2.4 ? () => leftScroll((windowWidth*.20) + (windowWidth*.01)) : null} 
            className="movie-row__arrows-container right flex row centered">
                <IoArrowForward className="icon"/>
            </div>}
            <Link to={`/${genre}`}><h1 className="movie-row__title">{genre}</h1></Link>

            

                <ul id={genre} ref={ref} style={{transform: 'translateX('+scrollPosition+'px)' }} className="movie-row__movies flex">
                    {movies.map((movie) => {
                        if (movie.genres.indexOf(genre) > 0) {
                            return (
                                <li><MovieRowItem
                                    className="movie-row__item" 
                                    key={movie._id} 
                                    movie={movie}
                                    loadTrailer={loadTrailer}/>
                                </li>
                            )
                        } else {
                            return null
                        }
                    })}
                    <li className="desktop__only"><Link to={`/${genre}`} className="movie-row-item__backdrop see-all flex clm centered ">
                        <p className="orange__link"> {genre}</p>
                        <div className="flex row">
                            <p>See All</p>
                            <IoArrowForward className='icon'/>
                        </div>
                    </Link></li>
                    <li className="mobile__only">
                        <Link 
                            to={`/${genre}`} 
                            className="movie-row-item__backdrop-mobile flex clm centered see-all__mobile">
                            <p className="orange__link"> {genre}</p>
                            <div className="flex row">
                                <p style={{fontSize: 14, marginRight: 8, fontWeight: 700}}>See All</p>
                                <IoArrowForward size={20} className='icon'/>
                            </div>            
                        </Link></li>
                </ul>
                {calc !== 0 ?
             
                    <div onClick={() => rightScroll((windowWidth*.20) + (windowWidth*.01))} className="movie-row__arrows-container left flex row centered">
                        <IoArrowBack className="icon"/>
                    </div>
               

                : null}

        </div>
    )
    
}

export default MovieRow;