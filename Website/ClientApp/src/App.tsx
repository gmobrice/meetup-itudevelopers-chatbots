import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/pages/Layout';
import { Home } from './components/pages/Home';

import './App.scss';

export default class App extends Component<any, any> {

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
      </Layout>
    );
  }
}
