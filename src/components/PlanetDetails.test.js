import React from 'react';
import { mount } from 'enzyme';

import PlanetDetails from './PlanetDetails';
import { planet } from '../data/fixtures';

const props = {
  planet,
  showAlert: jest.fn(),
  showDetails: true
 };

describe('PlanetDetails', () => {
  const planetDetails = mount(<PlanetDetails {...props} />);
  
  it('renders the PlanetDetails component', () => {
    expect(planetDetails.find('PlanetDetails').exists()).toBe(true);
  });

  it('and has showDetails props as true', () => {
    expect(planetDetails.find('PlanetDetails').prop('showDetails')).toBe(true);
  });

  it('renders the Modal title', () => {
    expect(planetDetails.find('ModalTitle h4').text()).toEqual(props.planet.name);
  });

  it('renders the planet name in table', () => {
    expect(planetDetails.find('span').at(2).text()).toEqual(props.planet.name);
  });

  it('renders the planet rotation period in table', () => {
    expect(planetDetails.find('span').at(3).text()).toEqual(props.planet.rotation_period);
  });

  it('renders the planet orbital period in table', () => {
    expect(planetDetails.find('span').at(4).text()).toEqual(props.planet.orbital_period);
  });

  it('renders the planet diameter in table', () => {
    expect(planetDetails.find('span').at(5).text()).toEqual(props.planet.diameter);
  });

  it('renders the planet climate in table', () => {
    expect(planetDetails.find('span').at(6).text()).toEqual(props.planet.climate);
  });

  it('renders the planet gravity in table', () => {
    expect(planetDetails.find('span').at(7).text()).toEqual(props.planet.gravity);
  });

  it('renders the planet terrain in table', () => {
    expect(planetDetails.find('span').at(8).text()).toEqual(props.planet.terrain);
  });

  it('renders the planet surface water in table', () => {
    expect(planetDetails.find('span').at(9).text()).toEqual(props.planet.surface_water);
  });

  it('renders the planet population in table', () => {
    expect(planetDetails.find('span').at(10).text()).toEqual(props.planet.population);
  });

  it('renders the planet created in table', () => {
    expect(planetDetails.find('span').at(11).text()).toEqual(props.planet.created);
  });

  it('renders the planet edited in table', () => {
    expect(planetDetails.find('span').at(12).text()).toEqual(props.planet.edited);
  });

  it('renders the planet url in table', () => {
    expect(planetDetails.find('span').at(13).text()).toEqual(props.planet.url);
  });

  describe('renders the close button on top right of modal', () => {

    beforeEach( () => {
      planetDetails.find('button').at(0).simulate('click');
    });

    it('and user clicks on the close button', () => {
      expect(props.showAlert).toHaveBeenCalledTimes(1);
    });
  });

  describe('renders the close button on bottom of modal', () => {

    beforeEach( () => {
      planetDetails.find('button').at(1).simulate('click');
    });

    it('and user clicks on the close button', () => {
      expect(props.showAlert).toHaveBeenCalledTimes(2);
    });
  });

});
