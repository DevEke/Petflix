import './accounts-view.scss';
import AccountItem from './account-item';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { IoAdd, IoChevronBack} from 'react-icons/io5';

export default function AccountsView({user, handleAccountSwitch, account, setAccount }) {
    const navigate = useNavigate();
    const accountData = localStorage.getItem('account');

    const handleSelectAccount = (x) => {
        handleAccountSwitch(x);
        navigate('/home')
    }

    const getAccount = () => {
        const act = JSON.parse(accountData);
        if ( act !== undefined) {
            setAccount(act);
        }
    }



    useEffect(() => {
        if (!user) {
            navigate('/')
        }
        if (account) {
            navigate('/home')
        }
        getAccount()
    }, [])

    return (
        <div className='section-wrapper'>
            <div className='section-container accounts-view_container'>
                <h1>Who's watching today?</h1>
                <div className='ww-grid'>
                    {
                        user?.accounts.map((account, idx) => {
                            return (
                                <AccountItem key={idx} setAccount={() => handleSelectAccount(account)} account={account}/>
                            )
                        })
                    }
                </div>
                </div>
        </div>
    )
}