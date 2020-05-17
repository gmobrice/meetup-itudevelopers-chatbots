import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu/NavMenu';

export class Layout extends Component<any, any> {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu />
        <Container fluid className="full">
          {this.props.children}
        </Container>
      </div>
    );
  }
}
