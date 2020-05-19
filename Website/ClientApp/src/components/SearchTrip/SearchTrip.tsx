import React, { Component } from 'react';
import { Input, InputGroup, InputGroupAddon, InputGroupText, Button, Label, FormGroup, Form, Container } from 'reactstrap';
import { AutoCompleteInput } from '../AutoCompleteInput/AutoCompleteInput';
import './SearchTrip.scss';

interface ISearchTripProps
{
}

interface ISearchTripState
{
    today: string,
    startDestination: string,
    endDestination: string,
    startDate: string,
    endDate: string
}

export class SearchTrip extends Component<ISearchTripProps, ISearchTripState>
{
    constructor(props: ISearchTripProps)
    {
        super(props);

        const today = new Date().toJSON().slice(0,10);
        this.state = { today: today, startDestination: "", endDestination: "", startDate: today, endDate: "" }
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleDateChange(e: React.ChangeEvent<HTMLInputElement>)
    {
        if (e.currentTarget.name === "start-date")
            this.setState({ startDate: e.currentTarget.value })
        else
            this.setState({ endDate: e.currentTarget.value });
    }

    handleInputChange(val: string, name: string)
    {
        if (name === "start-destination")
            this.setState({ startDestination: val });
        else
            this.setState({ endDestination: val });
    }

    render () 
    {
        return (
            <Container className="search-trip">
                    <div className="d-flex flex-wrap align-items-end justify-content-center form">
                        <div className="d-flex">
                            <div className="mx-2">
                                <Label>from</Label>
                                <AutoCompleteInput name="start-destination" onChange={this.handleInputChange} suggestions={['São Paulo', 'Rio de Janeiro', 'Minas Gerais']} placeholder="your home" />
                            </div>
                            <div className="mx-2">
                                <Label>to</Label>
                                <AutoCompleteInput name="end-destination"  onChange={this.handleInputChange} suggestions={['São Paulo', 'Rio de Janeiro', 'Minas Gerais']} placeholder="your destination" />
                            </div>
                        </div>
                        <div className="d-flex">
                            <div className="mx-2">
                                <Label>starts on</Label>
                                <div>
                                    <Input name="start-date" type="date" value={ this.state.startDate } min={ this.state.today } onChange={ this.handleDateChange } />
                                </div>
                            </div>
                            <div className="mx-2">
                                <Label>ends on</Label>
                                <div>
                                    <Input name="end-date" type="date" value={ this.state.endDate } min={ this.state.startDate } onChange={ this.handleDateChange } />
                                </div>
                            </div>
                        </div>
                        <Button className="mx-2">Search Trips</Button>
                    </div>

                    <div className="results p-4 mt-4">
                        <div>
                            <h1>
                                Results
                            </h1>
                            <p>asdasda</p>
                            <p>asdasda</p>
                            <p>asdasda</p>
                            <p>asdasda</p>
                            <p>asdasda</p>
                        </div>
                    </div>
            </Container>
        );
    }

}