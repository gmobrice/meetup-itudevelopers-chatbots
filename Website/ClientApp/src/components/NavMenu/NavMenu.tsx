import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';
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
        <Navbar className="navbar-expand-sm navbar-toggleable-sm navbar-transparent p-2 mb-3">
            <NavbarBrand className="mx-auto" tag={Link} to="/"><img src="./logo-black.svg" alt="Hit The Road" width="200" /></NavbarBrand>
        </Navbar>
      </header>
    );
  }
}
