import React, { Component } from 'react';

export default class Planet extends Component {

  showDetails() {
    this.props.showAlert(true, this.props.planetObj);
  }

  applyClassByPopulation() {
    const { population } = this.props.planetObj;
    const populationNum = parseInt(population, 10);
    if(populationNum < 10000000) {
      return 'small-planet';
    }
    else if(populationNum >= 10000000 && populationNum < 100000000) {
      return 'moderate-planet';
    }
    else if(populationNum >= 100000000 && populationNum < 500000000) {
      return 'large-planet';
    }
    else if(populationNum >= 500000000) {
      return 'huge-planet';
    }
    else {
      return 'population-unknown';
    }
  }

  render() {
    const planetClass = this.applyClassByPopulation();
    const { name, population } = this.props.planetObj;
    return (
      <div className = "population-div">
        <div className= "planet-card-labels">
          <span><label>Name: </label>{name}</span>
          <span><label>Population: </label>{population}</span>
        </div>
        <img src={require('../images/earth.png')} alt='Not available' className={planetClass} title={ name } onClick={() => this.showDetails()} />
      </div>
    )
  }
}
