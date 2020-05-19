import React, { Component } from 'react';
import { Input, InputGroup, InputGroupAddon, InputGroupText, Button, Label, FormGroup, Form, Container, Card, CardImg, CardBody, CardTitle, CardText, CardSubtitle, Row, Col } from 'reactstrap';
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
                <Row>
                    <Col className="mb-2">
                        <Label>from</Label>
                        <AutoCompleteInput name="start-destination" onChange={this.handleInputChange} suggestions={['São Paulo 🇧🇷']} placeholder="your home" />
                    </Col>
                    <Col className="mb-2">
                        <Label>to</Label>
                        <AutoCompleteInput name="end-destination"  onChange={this.handleInputChange} suggestions={['Dublin 🇮🇪', 'London 🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'New York 🇺🇸', 'Stockholm 🇸🇪']} placeholder="your destination" />
                    </Col>
                    <Col className="mb-2">
                        <Label>starts on</Label>
                        <Input name="start-date" type="date" value={ this.state.startDate } min={ this.state.today } onChange={ this.handleDateChange } />
                    </Col>
                    <Col className="mb-2">
                        <Label>ends on</Label>
                        <div>
                            <Input name="end-date" type="date" value={ this.state.endDate } min={ this.state.startDate } onChange={ this.handleDateChange } />
                        </div>
                    </Col>
                    <Col className="d-flex align-items-end mb-2">
                        <Button className="search">Search Trips</Button>
                    </Col>
                </Row>

                <div className="results p-4 mt-4">
                    <div>
                        <h1>Results</h1>
                        <h2><span className="text-secondary">Trips from </span>São Paulo 🇧🇷 <span className="text-secondary">to</span> Stockholm 🇸🇪</h2>
                        <h4><span className="text-secondary">between</span> 19/05/2020 <span className="text-secondary">and</span> 29/05/2020</h4>
                        <Row className="mt-4">
                            <Col md="4">
                                <Card>
                                    <CardImg top src="./Images/stockholm-sweden.jpg" />
                                    <CardBody>
                                        <CardTitle><h5>Air France AF 1263</h5></CardTitle>
                                        <CardSubtitle><h6>18 h 30 min</h6></CardSubtitle>
                                        <CardText>$ 350 + taxes</CardText>
                                        <Button>Buy tickets</Button>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col md="4">
                                <Card>
                                    <CardImg top src="./Images/stockholm-sweden.jpg" />
                                    <CardBody>
                                        <CardTitle><h5>Air France AF 1263</h5></CardTitle>
                                        <CardSubtitle><h6>18 h 30 min</h6></CardSubtitle>
                                        <CardText>lorem ipsum dolor sit amet</CardText>
                                        <Button>Buy tickets</Button>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col md="4">
                                <Card>
                                    <CardImg top src="./Images/stockholm-sweden.jpg" />
                                    <CardBody>
                                        <CardTitle><h5>Air France AF 1263</h5></CardTitle>
                                        <CardSubtitle><h6>18 h 30 min</h6></CardSubtitle>
                                        <CardText>lorem ipsum dolor sit amet</CardText>
                                        <Button>Buy tickets</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Container>
        );
    }

}