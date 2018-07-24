import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class PlanetDetails extends Component {

  handleDismiss() {
    this.props.showAlert(false, this.props.planet);
  }

  render() {
    return (
      <div>
        <Modal show={this.props.showDetails} onHide={this.handleDismiss.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.planet.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table>
              <tbody>
                <tr>
                  <td><label>Name</label>{' '}<span>{this.props.planet.name}</span></td>
                  <td><label>Rotation Period</label>{' '}<span>{this.props.planet.rotation_period}</span></td>
                </tr>
                <tr>
                  <td><label>Orbital Period</label>{' '}<span>{this.props.planet.orbital_period}</span></td>
                  <td><label>Diameter</label>{' '}<span>{this.props.planet.diameter}</span></td>
                </tr>
                <tr>
                  <td><label>Climate</label>{' '}<span>{this.props.planet.climate}</span></td>
                  <td><label>Gravity</label>{' '}<span>{this.props.planet.gravity}</span></td>
                </tr>
                <tr>
                  <td><label>Terrain</label>{' '}<span>{this.props.planet.terrain}</span></td>
                  <td><label>Surface Water</label>{' '}<span>{this.props.planet.surface_water}</span></td>
                </tr>
                <tr>
                  <td><label>Population</label>{' '}<span>{this.props.planet.population}</span></td>
                  <td><label>Created at</label>{' '}<span>{this.props.planet.created}</span></td>
                </tr>
                <tr>
                  <td><label>Edited at</label>{' '}<span>{this.props.planet.edited}</span></td>
                  <td><label>URL</label>{' '}<span>{this.props.planet.url}</span></td>
                </tr>
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.handleDismiss.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
