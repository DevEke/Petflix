import { IoFilm, IoShuffle } from 'react-icons/io5';
import './hero-display.scss';

export default function HeroDisplay({movies, setMovie, displayMovie, loadTrailer}) {
    return (
        <section className='section-wrapper'>
            <div className='section-container'>
        <div className='hero-header'>
        <h1 className='hero-title'>What to Watch</h1>
        <button className='btn' tabIndex={0} onClick={() => setMovie()}>
        <div className='btn_contents'>
           <span>Reshuffle</span>
            <IoShuffle className='icon'/>
            </div>
        </button>
        </div>
        {
            movies.length < 1 ?
            <div className='hero-loading'></div> :
            <>
            <div onClick={loadTrailer} className='hero-display_wrapper-mobile' style={{backgroundImage: `url(${displayMovie?.posterURL})`}}/>
            <div className='hero-display_wrapper' style={{backgroundImage: `url(${displayMovie?.backdropURL})`}} >
            <div className='hero-display_container'>
            <div className='hero-display_header'>
                <h2 className='hero-display_title'>{displayMovie?.title}</h2>
                <div className='hero-display_rating'>{displayMovie?.rating}</div>
            </div>
            <p className='hero-display_description'>{displayMovie?.description}</p>
            <button onClick={loadTrailer} className='btn'>
                <div className='btn_contents'>
                    <span>Play Trailer</span>
                    <IoFilm className='icon'/>
                </div>
            </button>
            </div>
        </div>
        </>
        }
        </div>
    </section> 
    )
}