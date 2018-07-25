import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { BASE_URL } from './Login';
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
      searchCount: 0,
      seconds: 0
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState(prevState => ({
            seconds: prevState.seconds + 1
          }));
  }

  planetSearch(term) {
    let { searchCount, seconds } = this.state;
    console.log("searchCount" + searchCount );
    console.log("seconds" + seconds);
    if(seconds < 60) {
      if(searchCount <= 15) {
        searchCount++;
        this.setState({ searchCount });
        this.fetchPlanets(term);
      }
      else {
        if(localStorage.getItem('user') === 'Luke Skywalker') {
          searchCount++;
          this.setState({ searchCount });
          this.fetchPlanets(term);
        }
        else {
          alert(`Search Threshold of 15 hits is exhausted. You can search after ${60-seconds} seconds`);
        }
      }
    }
    else {
      this.setState({
        searchCount: 1,
        seconds: 0
      })
      this.fetchPlanets(term);
    }
  }

  fetchPlanets(term) {
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
    let count = this.state.searchCount;
    count = count + 1;
    this.setState({
      searchCount: count
    });
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

  clearCache() {
    localStorage.removeItem('user');
    clearInterval(this.interval);
  }

  render() {
    const user = localStorage.getItem('user');
    const { planets, nextUrl, prevUrl, planetDetails, showDetails } = this.state;
    const planetSearch = _.debounce((term) => { this.planetSearch(term)}, 300);
    if(user){
      return (
        <div className="main-container">
          <div className= "heading-container">
            <div className= "left-panel">
              <h4>Search Planets screen</h4>
            </div>
            <div className = "right-panel">
              <h4>Welcome {localStorage.getItem('user')}</h4>
              <Link to='/' onClick={() => this.clearCache()}>Logout</Link>
            </div>
          </div>
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
    return (
      <div>
        <h4>Please login with your UserId and Password in order to access Star Wars</h4>
        <Link to='/'>Redirect to login</Link>
      </div>
    )
  }
}
