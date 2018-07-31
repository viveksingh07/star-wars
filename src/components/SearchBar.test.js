import React from 'react';
import { mount } from 'enzyme';

import SearchBar from './SearchBar';

const props = {
  onSearchTermChange: jest.fn()
}

describe('SearchBar', () => {

  const searchBar = mount(<SearchBar {...props} />);

  it('renders the SearchBar component', () => {
    expect(searchBar.find('SearchBar').exists()).toBe(true);
  });

  it('creates the Form component', () => {
    expect(searchBar.find('Form').exists()).toBe(true);
  });

  describe('when rendering the FormControl', () => {

    const testTerm = 'test term';

    beforeEach( () => {
      searchBar.find('FormControl').simulate('change', {
        target: { value: testTerm }
      });
    });

    it('updates the term in state as expected', () => {
      expect(searchBar.state().term).toEqual(testTerm);
    });

    it('and calls the parent method onSearchTermChange via props', () => {
        expect(props.onSearchTermChange).toHaveBeenCalledTimes(2);
    });

  });
});
