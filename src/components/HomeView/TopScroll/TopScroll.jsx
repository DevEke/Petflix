import TopItem from './TopScrollItem';
import { useRef, useEffect, useState, useContext } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import axios from 'axios';
import './top-scroll.scss';

export default function TopScroll({movies, loadTrailer}) {
    const [topMovies, setTopMovies] = useState([])
    const [topFilter, setTopFilter] = useState('All');
    const [count, setCount] = useState(1);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [containerWidth, setContainerWidth] =useState(undefined);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [shownItems, setShownItems] = useState(4);
    const limit = 10;
    const ref = useRef(null)
    const gap = 24;
    const scrollStop = 1 + (limit - shownItems);
    const itemWidth = (containerWidth - ((shownItems - 1) * gap)) / shownItems;
    const offset = itemWidth + gap;
    const loadingData = [1,2,3,4,5];

    const getTopMovies = () => {
    axios.get('https://petflix.herokuapp.com/movies')
    .then(res => {
        const data = res.data.movies;
        if (topFilter === 'All') {
            setTopMovies(data.slice(0, limit))
        } else {
            const topList = []
            data.forEach((movie) => {
                if (movie.genres.indexOf(topFilter) > 0) {
                    topList.push(movie)
                }
            })
            setTopMovies(topList.slice(0, limit));
            setCount(1);
            setScrollPosition(0);
        }
        console.log({message: 'Got Movies!'})
    })
    .catch(err => {
        console.log(err.data)
    })
    }


    const leftScroll = () => {
        setCount(count-1);
        setScrollPosition(Math.round(scrollPosition+offset));
    }

    const rightScroll = () => {
        setCount(count+1);
        setScrollPosition(Math.round(scrollPosition-offset));
    }





    useEffect(() => {
        setContainerWidth(ref?.current.clientWidth);
        getTopMovies();
        if (windowWidth <= 425) {
            setShownItems(1)
        } else if (windowWidth > 425 && windowWidth <= 864 ) {
            setShownItems(2)
        } else if (windowWidth > 864 && windowWidth <= 1240) {
            setShownItems(3)
        } else {
            setShownItems(4)
        }
        
    }, [topFilter, windowWidth])

    return (
        <section id="top">
        <div className='top-header'>
            <div className='top-header_title_container'>
            <h1 className='top-title'>Top Rated</h1>
            <div className='top-select_wrapper'>
                <select onChange={(x) => setTopFilter(x.target.value)} className='top-select' tabIndex={0}>
                    <option value='All'>All</option>
                    <option value='Animation'>Animation</option>
                    <option value='Comedy'>Comedy</option>
                    <option value='Drama'>Drama</option>
                    <option value='Action'>Action</option>
                    <option value='Family'>Family</option>
                </select>
            </div>
            </div>
            <div className='top-movies_control_container'>
        {
            count === 1 ?
            <div className='top-scroll_arrow arrow-left'><IoChevronBack className='icon'/></div>
             :

            <div 
            onClick={() => leftScroll()}
            className='top-scroll_arrow arrow-left'><IoChevronBack className='icon'/></div>

        }
            {
            count === scrollStop ? 
            <div className='top-scroll_arrow arrow-right' 
            >
                <IoChevronForward className='icon'/>
            </div>
            :
            <div className='top-scroll_arrow arrow-right' 
            onClick={() => rightScroll()}
            >
                <IoChevronForward className='icon'/>
            </div>
            }
            
        </div>
        </div>
            <div className='top-scroll_wrapper' ref={ref}>
            
            <div className='top-movies_list' style={{transform: 'translateX('+ scrollPosition +'px)' }}> 
                {   topMovies.length < 1 ?
                    loadingData.map((movie, idx) => {
                        return (
                            <div key={idx} className='top-item_loading'></div>
                        )
                    }) :
                    topMovies.slice(0,limit).map((movie, idx) => {
                        if (topFilter === 'All') {
                            return (
                                <div onClick={() => loadTrailer(movie)} tabIndex={idx} className='top-item_wrapper' key={idx} style={{width: `${itemWidth}px`}}>
                                    <TopItem movie={movie} rank={idx + 1}/>
                                </div>
                            )
                        } else {
                           if (movie.genres.indexOf(topFilter) > 0) {
                            return (
                                <div onClick={() => loadTrailer(movie)} tabIndex={idx} className='top-item_wrapper' key={idx} style={{width: `${itemWidth}px`}}>
                                    <TopItem movie={movie} rank={idx + 1}/>
                                </div> 
                            )
                           } 
                        }
                        
                    })
                }
            </div>
        </div>
        </section>
    )
}