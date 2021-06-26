import {BrowserRouter as Router, Route} from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import SelectProfile from './components/SelectProfile/select-profile';
import HomeView from './components/HomeView/home-view';
import LoadingHome from './components/LoadingHome/loading-home';
import './petflix.scss';


class Petflix extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      movies: [],
      trailer: false
    }
  }

  componentDidMount() {
    axios.get('https://petflix.herokuapp.com/movies')
    .then((response) => {
      this.setState({
        movies: response.data
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  setUser = (user) => {
    this.setState({
      user: user
    });
  }

  toggleTrailer = () => {
    if (this.state.trailer) {
    this.setState({
      trailer: false
    })
  } else {
    this.setState({
      trailer: true
    })
  }
  }


  clearUser = () => {
    this.setState({
      user: null
    });
    console.log('Clicked');
  }

  render(){
    const {user, movies, trailer } = this.state;

    return (
      <Router>
        {/* <Route exact path="/" render={() => { 
          // if (!user) return <SelectProfile setUser={user => this.setUser(user)} /> ;
          return <HomeView movies={movies} clearUser={() => this.clearUser} />}}
        /> */}
        {movies.length === 0 ? 
          <LoadingHome/> : 
          <HomeView  
            toggleTrailer={() => this.toggleTrailer}
            trailer={trailer} 
            movies={movies} 
            clearUser={() => this.clearUser} /> }
      </Router>
    );
  }
}

export default Petflix;
