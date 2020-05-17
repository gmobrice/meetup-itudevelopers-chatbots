import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Input, Label, InputGroup, InputGroupAddon, InputGroupText, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';

import './SearchTrip.scss';

interface ISearchTripProps
{
}

interface ISearchTripState
{
    today: string,
    
}

export class SearchTrip extends Component<ISearchTripProps, ISearchTripState>
{
    constructor(props: ISearchTripProps)
    {
        super(props);

        const today = new Date().toJSON().slice(0,10);
        this.state = { today: today }
    }

    render () 
    {
        return (
            <div className="search-trip">
                <div className="d-flex ">
                    <div>
                        <div className="d-flex mb-2">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>from</InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="your home" />
                            </InputGroup>

                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>to</InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="your destination" />
                            </InputGroup>
                        </div>
                        <div className="d-flex justify-content-center">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>starts on</InputGroupText>
                                </InputGroupAddon>
                                <Input type="date" min={this.state.today} />
                            </InputGroup>

                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>ends on</InputGroupText>
                                </InputGroupAddon>
                                <Input type="date" min={this.state.today} />
                            </InputGroup>
                        </div>
                    </div>

                    <Button className="ml-3">Search Trips</Button>
                </div>
                


            </div>
        );
    }

}