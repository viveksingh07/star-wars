import React, { Component } from 'react';
import { Form, FormControl } from 'react-bootstrap';

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = { term : '' };
  }

  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }

  render() {
    return (
      <div className="search-bar">
        <Form inline>
          <FormControl placeholder="Enter Planet name" onChange={ event => this.onInputChange(event.target.value)} />
        </Form>
      </div>
    );
  }
}

export default SearchBar;
