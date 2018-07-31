import React from 'react';
import { mount } from 'enzyme';

import Login from './Login';

describe('Login', () => {

  let login = mount(<Login />);

  it('renders the login component', () => {
    expect(login.find('Login').exists()).toBe(true);
  });

  it('creates a form component', () => {
    expect(login.find('Form').exists()).toBe(true);
  });

  it('creates 3 FormGroup components', () => {
    expect(login.find('FormGroup').length).toEqual(3);
  });

  it('renders the Sign in button', () => {
    expect(login.find('.btn').at(0).text()).toEqual('Sign in');
  });

  describe('when rendering the first FormGroup', () => {

    it('renders the label for UserId', () => {
      expect(login.find('label').at(0).text()).toEqual('User ID');
    });

    it('Form Control for User Id', () => {
      expect(login.find('FormControl').at(0).exists()).toBe(true);
    });
  });

  describe('when rendering the second FormGroup', () => {

    it('renders the label for password', () => {
      expect(login.find('label').at(1).text()).toEqual('Password');
    });

    it('Form Control for Password', () => {
      expect(login.find('FormControl').at(1).exists()).toBe(true);
    });
  });

  describe(' and when entering the userId and password', () => {

    const testUser = 'test user';
    const testpwd = 'password123';

    beforeEach(() => {

      login.find('FormControl').at(0).simulate('change', {
        target: { value: testUser }
      });

      login.find('FormControl').at(1).simulate('change', {
        target: { value: testpwd }
      });
    });

    it('updates the user id in state', () => {
      expect(login.state().userId).toEqual(testUser);
    });

    it('updates the password in state', () => {
      expect(login.state().password).toEqual(testpwd);
    });
  });
});
