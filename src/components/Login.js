import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Redirect } from 'react-router';
import { bake_cookie } from 'sfcookies';
import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from 'react-bootstrap';

export const cookie_key = 'User';

export const BASE_URL = 'https://swapi.co/api/';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      password: '',
      userIdValidation: true,
      passwordValidation: true,
      redirect: false
    }
  }

  authenticateUser() {
    const { userId, password } = this.state;
    const url = `${BASE_URL}people/?search=${userId}`
    const request = axios.get(url);
    request.then(response => {
        const people = response.data;
        if(people) {
          const match = _.find(people.results, { 'birth_year': password });
          if(match){
            this.setState({
              redirect: true
            })
            bake_cookie(cookie_key, userId);
          }
          else {
            this.setState({
              passwordValidation: false
            })
          }
        }
        else {
          this.setState({
            userIdValidation: false
          })
        }
      })
  }

  getUserValidation() {
    const { userIdValidation } = this.state;
    if(!userIdValidation) {
      return 'error';
    }
    return null;
  }

  getPasswordValidation() {
    const { passwordValidation } = this.state;
    if(!passwordValidation) {
      return 'error';
    }
    return null;
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/planets" />;
    }
    return (
      <div className='login-form'>
        <h4>Login to Star Wars</h4>
        <br />
        <Form horizontal>
          <FormGroup controlId="formHorizontalUserId" validationState={this.getUserValidation()}>
            <Col componentClass={ControlLabel} sm={3} className="alignLeft">
              User ID
            </Col>
            <Col sm={9}>
              <FormControl type="text" placeholder="User ID" onChange={event => this.setState({ userId: event.target.value })} />
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPassword" validationState={this.getPasswordValidation()}>
            <Col componentClass={ControlLabel} sm={3}>
              Password
            </Col>
            <Col sm={9}>
              <FormControl type="password" placeholder="Password" onChange={event => this.setState({ password: event.target.value })} />
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="primary" type="button" onClick={ () => this.authenticateUser() }>Sign in</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}
