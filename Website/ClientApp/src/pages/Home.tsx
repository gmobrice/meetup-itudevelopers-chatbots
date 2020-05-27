import React, { Component } from 'react';
import { SearchTrip } from '../components/SearchTrip/SearchTrip';
import './Home.scss';

export class Home extends Component<any, any> {
    static displayName = Home.name;

    render () {
        return (
        <div>
            <div id="home" className="d-flex flex-wrap justify-content-center mt-4">
                <SearchTrip />
            </div>
        </div>
        );
    }
    }
