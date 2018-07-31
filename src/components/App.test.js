import React from 'react';
import { mount } from 'enzyme';

import App from './App';

describe('App', () => {
  let app = mount(<App />);
  it('renders the App title', () => {
    expect(app.find('h4').text()).toEqual('Login to Star Wars');
  })
  describe('when rendering the login', () => {
    it('renders the login component', () => {
      expect(app.find('Login').exists()).toBe(true);
    })
  })
})
