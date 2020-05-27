import React, { Component } from 'react';
import { Input, Button, Label, Container, Card, CardImg, CardBody, CardTitle, CardText, CardSubtitle, Row, Col } from 'reactstrap';
import { AutoCompleteInput } from '../AutoCompleteInput/AutoCompleteInput';
import { ISearchTripState, IDestination, ITrip } from '../../interfaces/Interfaces';
import './SearchTrip.scss';

export class SearchTrip extends Component<{}, ISearchTripState>
{
    constructor(props: {})
    {
        super(props);

        const today = new Date().toJSON().slice(0,10);
        this.state = { today: today, origin: "", destination: "", startDate: today, endDate: "", destinations: [], suggestions: [], alert: false, alertText: "", result: false, trip: []}
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.searchTrips = this.searchTrips.bind(this);
    }

    componentDidMount()
    {
        fetch('api/getDestinations/')
            .then(resp => resp.json())
            .then(json => {
                let dest: IDestination[] = json;
                let sugg = dest.map(d => d.name)

                this.setState({
                    destinations: dest,
                    suggestions: sugg
                });
            });
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
        if (name === "origin")
            this.setState({ origin: val });
        else
            this.setState({ destination: val });
    }

    searchTrips()
    {
        let startDate = Date.parse(this.state.startDate);
        let endDate = Date.parse(this.state.endDate);

        if (endDate >= startDate)
        {
            if (this.state.destination != this.state.origin)
            {
                let origin = this.state.destinations.find(d => d.name === this.state.origin);
                let destination = this.state.destinations.find(d => d.name === this.state.destination);
    
                fetch(`api/getTrip/origin/${origin?.id}/destination/${destination?.id}`)
                    .then(resp => resp.json())
                    .then(json => {
                        let trip: ITrip[] = json;
                        this.setState({
                            trip: trip,
                            alertText: "",
                            alert: false,
                            result: true
                        })
                    })
            }
            else
            {
                this.setState({
                    alert: true,
                    alertText: "Atenção! Origem e destino não podem ser iguais!",
                    result: false,
                    trip: []
                });
            }
            
        }
        else
        {
            this.setState({
                alert: true,
                alertText: "Atenção! Sua viagem não pode acabar antes de começar!",
                result: false,
                trip: [],
            });
        }
    }

    render () 
    {

        let alertClassName = (this.state.alert) ? 'd-flex' : 'd-none';
        let resultClassName = (this.state.result) ? 'd-flex' : 'd-none';

        let results;

        let startDate = new Date(this.state.startDate);
        startDate.setDate(startDate.getDate() + 1);

        let endDate = new Date(this.state.endDate);
        endDate.setDate(endDate.getDate() + 1);

        if (this.state.trip.length > 0 && this.state.result)
        {
            results = (
                <div>
                    <h1>Resultado da pesquisa</h1>
                    <h2><span className="text-secondary">Viagens de </span> { this.state.trip[0].origin.name } <span className="text-secondary">para</span> { this.state.trip[0].destination.name } </h2>
                    <h4><span className="text-secondary">entre</span> { startDate.toLocaleDateString('pt-br') } <span className="text-secondary">e</span> { endDate.toLocaleDateString('pt-br') } </h4>
                    
                    <Row className="mt-4">
                        {
                            this.state.trip.map((trip, index) => {
                                return (
                                    <Col md="4" xs="12">
                                        <Card key={index}>
                                            <CardImg top src={ trip.destination.photo } alt={ trip.destination.name } />
                                            <CardBody>
                                                <CardTitle><h5>{ trip.name }</h5></CardTitle>
                                                <CardSubtitle><h6>{"R$ " + trip.price.toFixed(2) }</h6></CardSubtitle>
                                                <Button onClick={ () => { window.open('https://www.skyscanner.com/', '_blank') } }>Comprar passagens</Button>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
            );
        }

        return (
            <Container className="search-trip">
                <Row>
                    <Col className="mb-2">
                        <Label>origem</Label>
                        <AutoCompleteInput name="origin" onChange={ this.handleInputChange } suggestions={ this.state.suggestions } placeholder="sua cidade" />
                    </Col>
                    <Col className="mb-2">
                        <Label>destino</Label>
                        <AutoCompleteInput name="destination"  onChange={ this.handleInputChange } suggestions={ this.state.suggestions } placeholder="seu destino" />
                    </Col>
                    <Col className="mb-2">
                        <Label>começando em</Label>
                        <Input name="start-date" type="date" value={ this.state.startDate } min={ this.state.today } onChange={ this.handleDateChange } />
                    </Col>
                    <Col className="mb-2">
                        <Label>terminando em</Label>
                        <div>
                            <Input name="end-date" type="date" value={ this.state.endDate } min={ this.state.startDate } onChange={ this.handleDateChange } />
                        </div>
                    </Col>
                    <Col className="d-flex align-items-end mb-2">
                        <Button className="search" onClick={ this.searchTrips }>Procurar viagens</Button>
                    </Col>
                </Row>
                <Row>
                    <Col className={"alert justify-content-center " + alertClassName}>
                        <p>{this.state.alertText}</p>
                    </Col>
                </Row>

                <div className={"results p-4 mt-4 " + resultClassName}>
                    <div>
                        { results }
                    </div>
                </div>
            </Container>
        );
    }
}