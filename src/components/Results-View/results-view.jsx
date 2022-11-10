import './results-view.scss';
import { IoArrowBack, IoPawOutline } from 'react-icons/io5';
import ResultItem from '../ResultItem/result-item';
 

function ResultsView(props) {

    const { movies, query, handleClear, loadTrailer } = props;
    let filteredMovies = movies;
    const cased = query.toLowerCase();
    
    if (query !== '') {
        filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(cased))
    }
    if (!movies) return null;

    return (
        <div className="results-wrapper">
            <div className='results_header'>
                <p> {filteredMovies.length !== 1 ? `${filteredMovies.length} results` : `${filteredMovies.length} result`}</p>
            </div>
            <div className='results_list'>
            {
                filteredMovies.length < 1 ?
                <div className='no-results-container'>
                    <IoPawOutline className='icon'/>
                    <h1>No Results</h1>
                    <p>Try again.</p>
                </div>
                :
                <ul className='results-container'>
                    {
                        filteredMovies.map((movie, idx) => {
                            return (
                                <li><ResultItem loadTrailer={loadTrailer} key={idx} movie={movie}/></li>
                            )
                        })
                    }
                </ul>
            }
            </div>
           
        </div>
    )
}

export default ResultsView;