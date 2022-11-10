import './favorites-view.scss';
import FavoritesItem from './favorites-item';
import axios from 'axios';
import { IoTrashBinOutline, IoPawOutline} from 'react-icons/io5'

export default function FavoritesView({ account, loadTrailer }) {


    return (
        <div className="favorites-view_wrapper">
            <div className='favorites-view_container'>
                {
                    account?.favorites.length === 0 ?
                    <div className='no_favorites'>
                        <IoPawOutline className='icon'/>
                        <h1>No Favorites</h1>
                        <p>Browse Movies and Add Favorites</p>
                    </div>
                    :
                    <div className='scroll_container'>
                    <ul className='favorites_grid'>
                    {
                        account?.favorites.map((movie, idx) => {
                            return (
                                <li
                                    key={idx} >
                                        <FavoritesItem loadTrailer={loadTrailer} movie={movie}/>
                                </li>
                            )
                        })
                    }
                </ul>
                </div>
                }
                
            </div>
        </div>
    )
}