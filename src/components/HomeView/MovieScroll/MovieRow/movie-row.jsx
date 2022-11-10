
import './movie-row.scss';
import MovieRowItem from '../MovieRowItem/movie-row-item';
import { Link } from 'react-router-dom';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import {useRef  , useEffect, useState} from 'react';

function MovieRow(props) {
    const {genre, movies, loadTrailer} = props;
    const [count, setCount] = useState(1);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [containerWidth, setContainerWidth] = useState(undefined);
    const [shownItems, setShownItems] = useState(4);
    const [limit, setLimit] = useState(undefined);
    const ref = useRef(null);
    const list = useRef(null);
    const loadingData = [1,2,3,4,5];
    const gap = 24;
    const fadeWidth = (windowWidth - containerWidth) /2;
    const itemWidth = (containerWidth - ((shownItems - 1) * gap)) / shownItems;
    const offset = (itemWidth + gap);

    const leftScroll = () => {
        setCount(count-1);
        setScrollPosition(Math.round(scrollPosition + (offset)));
    }

    const rightScroll = () => {
        setCount(count+1);
        setScrollPosition(Math.round(scrollPosition - (offset)));
    }


    useEffect(() => {
        setContainerWidth(ref?.current.clientWidth);
        setLimit(list?.current.childNodes.length)
        if (windowWidth <= 425) {
            setShownItems(2)
        } else if (windowWidth > 425 && windowWidth <= 864 ) {
            setShownItems(3)
        } else if (windowWidth > 864 && windowWidth <= 1240) {
            setShownItems(3)
        } else {
            setShownItems(4)
        }
    },[windowWidth])

    return (
        <div className="section-wrapper movie-row__container" >
            <div className="fader_left" style={{width: `${fadeWidth}px`, left: `${0}px`}}/>
            <div className='section-container movie-row_header'>
            <h2 className='genres-scroll_title'>{genre}</h2>
            <div className='scroll_control'>
            {
                count === 1 ?
                <div 
                className='genres-scroll_arrow arrow-left'><IoChevronBack className='icon'/></div> :
                <div 
                    onClick={() => leftScroll()}
                    className='genres-scroll_arrow arrow-left'><IoChevronBack className='icon'/></div>
            }
            {
                count === (limit + shownItems) ?
                <div className='genres-scroll_arrow arrow-right' 
                >
                    <IoChevronForward className='icon'/>
                </div> :
                <div className='genres-scroll_arrow arrow-right' 
                onClick={() => rightScroll()}
                >
                    <IoChevronForward className='icon'/>
                </div>
            }
            </div>
            </div>
                <div ref={ref} className='section-container movie-scroll_wrapper'>
                <ul id={genre} ref={list} style={{transform: 'translateX('+scrollPosition+'px)' }} className="movie-row__movies flex">
                    {movies.length < 1 ?
                    loadingData.map((movie, idx) => {
                        return (
                            <li key={idx}><div style={{width: `${itemWidth}px`}} className='movie-row__item_loading'></div></li>
                        )
                    }) :
                    movies.map((movie) => {
                        if (movie.genres.indexOf(genre) > 0) {
                            return (
                                <li onClick={() => loadTrailer(movie)}><MovieRowItem
                                    width={itemWidth}
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
                    <li className="desktop__only"><div className="movie-row-item__backdrop see-all flex clm centered ">
                        <p className="orange__link"> {genre}</p>
                        <div className="flex row">
                            <p>See All</p>
                            <IoChevronForward className='icon'/>
                        </div>
                    </div></li>
                    <li className="mobile__only">
                        <div 
                            className="movie-row-item__backdrop-mobile flex clm centered see-all__mobile">
                            <p className="orange__link"> {genre}</p>
                            <div className="flex row">
                                <p style={{fontSize: 14, marginRight: 8, fontWeight: 700}}>See All</p>
                                <IoChevronForward size={20} className='icon'/>
                            </div>            
                        </div></li>
                </ul>
                </div>
                
            <div className='fader_right'  style={{width: `${(fadeWidth + 10)}px`, right: `-${10}px`}}/>
        </div>
    )
    
}

export default MovieRow;