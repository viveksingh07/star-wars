import React from 'react';
import { mount } from 'enzyme';

import Planet from './Planet';
import { planetObj } from '../data/fixtures';

const props = {
  planetObj,
  showAlert: jest.fn()
};

describe('Planet', () => {
  const planet = mount(<Planet {...props} />);
  
  it('renders the Planet component', () => {
    expect(planet.find('Planet').exists()).toBe(true);
  });

  it('renders the expected name of planet', () => {
    expect(planet.find('span').at(0).text()).toEqual(`Name: ${props.planetObj.name}`);
  });

  it('renders the expected population of planet', () => {
    expect(planet.find('span').at(1).text()).toEqual(`Population: ${props.planetObj.population}`);
  });

  it('renders the planet image', () => {
    expect(planet.find('img').exists()).toBe(true);
  });

  describe('and user clicks on the planet', () => {

    beforeEach( () => {
      planet.find('img').simulate('click');
    });

    it('than planet details popup should render', () => {
      expect(props.showAlert).toHaveBeenCalledTimes(1);
    });
  });
});
