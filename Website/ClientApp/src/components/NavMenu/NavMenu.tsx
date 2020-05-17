import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { SearchTrip } from '../SearchTrip/SearchTrip';
import './NavMenu.scss';

export class NavMenu extends Component<any, any> {

  constructor (props: any) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm navbar-transparent fixed-top p-2 mb-3">
          <Container fluid>
            <NavbarBrand className="mr-4" tag={Link} to="/"><img src="./logo-white.svg" width="200" /></NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex d-flex justify-content-end" isOpen={!this.state.collapsed} navbar>
                <SearchTrip />
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
