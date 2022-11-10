
import React, { useState, useEffect,  } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeView from './components/HomeView/home-view';
import LoadingView from './components/ModalViews/loading-view';
import LoginView from './components/AuthViews/login-view';
import RegisterView from './components/AuthViews/register-view';
import AccountsView from './components/AccountsView/accounts-view';
import ProfileView from './components/ProfileViews/profile-view';
import ForgotView from './components/AuthViews/forgot-view';
import Alert from './components/ModalViews/alert-view';
import Trailer from './components/Trailer/trailer';
import './petflix.scss';


export default function Petflix() {
  const [user, setUser] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [trailer, setTrailer] = useState(false);
  const [trailerMovie, setTrailerMovie] = useState(undefined);
  const [alertList, setAlertList] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const auth = localStorage.getItem('auth');
  const navigate = useNavigate();

  const addToFavorites = (id) => {
    axios.post(`https://petflix.herokuapp.com/${user?._id}/${account?._id}/add-favorites/${id}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(res => {
      handleAlerts(res.data.message, res.data.status)
    })
    .catch(err => {
      handleAlerts(err.response.data.message, err.response.data.status)
    })
    // getUser(auth, token);
  }

  const removeFromFavorites = (id) => {
    axios.delete(`https://petflix.herokuapp.com/${user?._id}/${account?._id}/remove-favorite/${id}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(res => {
      handleAlerts(res.data.message, res.data.status);
      
    })
    .catch(err => {
      handleAlerts(err.response.data.message, err.response.data.status)
    })
    // getUser(auth, token);
  }

  const signOut = () => {
    localStorage.clear();
    setUser(undefined);
    setAccount(undefined)
    navigate('/');
    handleAlerts('You have been logged out successfully.', 'success')
  }

  const getUser = () => {
    console.log('getting user')
    const userData = JSON.parse(auth);
    axios.get(`https://petflix.herokuapp.com/user/${userData?._id}`, {
    headers: {Authorization: `Bearer ${token}`}
    })
    .then(res => {
      const data = res.data
      setUser(data.auth);
      navigate('/switch-accounts')
    })
    .catch(err => {
      console.log(err.response.data)
    })}

const handleAccountSwitch = (account) => {
    localStorage.setItem('account', JSON.stringify(account));
    setAccount(account);
}

const handleLoading = (boolean) => {
  setLoading(boolean);
}

const handleAlerts = (x, y) => {
  let newAlert = {
    alert: x,
    type: y 
  }
  if (!alertList.some(obj => obj.alert === x)) {
    setAlertList([...alertList, newAlert])
  }
  setTimeout(() => {
    setAlertList(alertList.filter((obj) => obj.alert !== x))
  }, 7000)
}

const removeAlert = (x) => {
  setAlertList(alertList.filter((obj) => obj.alert !== x))
}

const loadTrailer = (movie) => {
  if (!trailer) { setTrailer(true);}
  setTrailerMovie(movie);
}

const clearTrailer = () => {
  if (trailer) {setTrailer(false)}
  setTrailerMovie(undefined)
}

useEffect(() => {
  getUser()
  if (!account) {
    navigate('/switch-accounts')
  }
}, [])
  

    return (
      <div className='petflix-wrapper'>
        {
          loading ?
          <LoadingView/>:
          null
        }
        {
        alertList.length > 0 ?
        <div className="modal_container">
          <div className="alerts_list">
            {alertList.map((alert, idx) => {
              return (
                <Alert 
                  key={idx} 
                  alertMessage={alert.alert} 
                  alertType={alert.type} 
                  removeAlert={() => removeAlert(alert.alert)}
                />
              )
            })}

          </div>
        </div>:
        null
      }
      <div className="page-wrapper">
            {
            trailer && trailerMovie ?
            <Trailer
              account={account} 
              addToFavorites={(x) => addToFavorites(x)}
              removeFromFavorites={(x) => removeFromFavorites(x)} 
              movie={trailerMovie} 
              clearTrailer={() => clearTrailer()}
            /> :
            null
            }
          <Routes>
            <Route 
              exact path='/'
              element={
                <LoginView
                  getUser={() => getUser}
                  handleLoading={(x) => handleLoading(x)}
                  handleAlerts={(x,y) => handleAlerts(x,y)} 
                  setUser={(x) => setUser(x)}
                />
              }
            />
            <Route 
              exact path='/register'
              element={
                <RegisterView
                  handleLoading={(x) => handleLoading(x)}
                  handleAlerts={(x,y) => handleAlerts(x,y)} 
                  signIn={(x,y) => signIn(x,y)}
                />
              }
            />
            <Route 
              exact path='/forgot'
              element={
                <ForgotView
                  handleLoading={(x) => handleLoading(x)}
                  handleAlerts={(x,y) => handleAlerts(x,y)} 
                />
              }
            />
            <Route 
              exact path='/home' 
              element={ 
                <HomeView
                  openMobileMenu={() => setMobileMenu(true)}
                  clearTrailer={() => clearTrailer()}
                  loadTrailer={(x) => loadTrailer(x)}
                  getUser={(x,y) => getUser(x,y)}
                  handleAlerts={(x,y) => handleAlerts(x,y)}
                  user={user}
                  account={account} 
                />
              }
            />
            <Route
              exact path='/switch-accounts'
              element={
                <AccountsView 
                  user={user}
                  account={account}
                  setAccount={(x) => setAccount(x)}
                  handleAccountSwitch={(x) => handleAccountSwitch(x)}
                />
              }
            />
            <Route
             exact path='/dashboard'
             element={
              <ProfileView
                handleAccountSwitch={(x) => handleAccountSwitch(x)}
                getUser={() => getUser(auth, token)}
                loadTrailer={(x) => loadTrailer(x)}
                account={account}
                user={user}
                handleAlerts={(x,y) => handleAlerts(x,y)}
                signOut={() => signOut()} 
                clearAccount={() => setAccount(undefined)}/>
              }
            />
          </Routes>
          </div>
        </div>
    );
}
