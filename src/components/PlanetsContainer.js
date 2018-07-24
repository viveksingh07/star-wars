import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { read_cookie } from 'sfcookies';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { BASE_URL, cookie_key } from './Login';
import Planet from './Planet';
import PlanetDetails from './PlanetDetails';
import { Button } from 'react-bootstrap';

export default class PlanetsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      planets: [],
      nextUrl: null,
      prevUrl: null,
      planetDetails: {},
      showDetails: false,
      user: '',
      timeInterval: 0
    }
  }

  componentWillMount() {
    const user = read_cookie(cookie_key);
    this.setState({ user });
    (user === 'Luke Skywalker' ? this.setState({ timeInterval: 300}) : this.setState({ timeInterval: 400 }));
  }

  planetSearch(term) {
    const url = `${BASE_URL}planets/?search=${term}`;
    const request = axios.get(url);
    request.then(response => {
      if(response.data) {
        const { next, previous, results } = response.data;
        this.setState({
          prevUrl: previous,
          nextUrl: next,
          planets: results
        })
      }
    })
  }

  fetchMore(url) {
    const request = axios.get(url);
    request.then(response => {
      if(response.data) {
        const { next, previous, results } = response.data;
        this.setState({
          prevUrl: previous,
          nextUrl: next,
          planets: results
        })
      }
    })
  }

  showPlanetDetails(flag, planet) {
    this.setState({
      showDetails: flag,
      planetDetails: planet
    })
  }

  render() {
    const { planets, nextUrl, prevUrl, planetDetails, showDetails, user, timeInterval } = this.state;
    const planetSearch = _.debounce((term) => { this.planetSearch(term)}, timeInterval);
    if(user === ''){
      return (
        <div>
          <h4>Please login with your UserId and Password in order to access Star Wars</h4>
          <Link to='/'>Redirect to login</Link>
        </div>
      )
    }
    return (
      <div className="main-container">
        <h4>Welcome {user}</h4>
        <Link to='/'>Logout</Link>
        <h4>Search Planets screen</h4>
        <hr />
        <SearchBar onSearchTermChange={planetSearch}/>
        <div className= "planet-card-container">
        {
          planets.map((planet, index) => {
            return (
              <Planet key={index} planetObj={planet} showAlert={this.showPlanetDetails.bind(this)} />
            )
          })
        }
      </div>
         <div className= "button-container">
        {
          prevUrl !== null ? <Button bsStyle="primary" className="previous-button" type="button" onClick={ () => this.fetchMore(prevUrl) }>Previous</Button> : ''
        }
        {
          nextUrl !== null ? <Button bsStyle="primary" className="next-button" type="button" onClick={ () => this.fetchMore(nextUrl) }>Next</Button> : ''
        }
        </div>
        {
          showDetails ? <PlanetDetails planet={planetDetails} showDetails={showDetails} showAlert={this.showPlanetDetails.bind(this)}/> : ''
        }
      </div>
    )
  }
}
