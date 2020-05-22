import React, { Component } from 'react';
import { Input, Button, Label, Container, Card, CardImg, CardBody, CardTitle, CardText, CardSubtitle, Row, Col } from 'reactstrap';
import { AutoCompleteInput } from '../AutoCompleteInput/AutoCompleteInput';
import { ISearchTripState, IDestination, ITrip, ISuggestion } from '../../interfaces/Interfaces';
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
                    alertText: "ATTENTION: Origin and Destination can't be the same!",
                    result: false,
                    trip: []
                });
            }
            
        }
        else
        {
            this.setState({
                alert: true,
                alertText: "ATTENTION: Your trip cannot end before it begins!",
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
                <Row className="mt-4">
                    {
                        this.state.trip.map((trip, index) => {

                            let destinationImage;

                            switch (trip.destination.name)
                            {
                                case "São Paulo":
                                    destinationImage = "https://lonelyplanetimages.imgix.net/mastheads/72768175.jpg?sharp=10&vib=20&w=1200";
                                    break;
                                case "Rio de Janeiro":
                                    destinationImage = "http://ichef-1.bbci.co.uk/news/1024/media/images/69725000/jpg/_69725542_rio2.jpg";
                                    break;
                                case "London":
                                    destinationImage = "https://i.ytimg.com/vi/6iTBNNn8z4E/maxresdefault.jpg";
                                    break;
                                case "Stockholm":
                                    destinationImage = "https://i.ytimg.com/vi/3bX2dRwNdt0/maxresdefault.jpg";    
                                    break;
                                case "Dublin":
                                    destinationImage = "https://media.cntraveler.com/photos/5b2be69494553e5edba9851d/master/w_1200,c_limit/Dublin_GettyImages_688242264.jpg";
                                    break;

                            }

                            return (
                                <Col md="4" xs="12">
                                    <Card key={index}>
                                        <CardImg top src={ destinationImage } alt={ trip.destination.name } />
                                        <CardBody>
                                            <CardTitle><h5>{ trip.name }</h5></CardTitle>
                                            <CardSubtitle><h6>{"$" + trip.price.toFixed(2) }</h6></CardSubtitle>
                                            <Button onClick={ () => { window.open('https://www.skyscanner.com/', '_blank') } }>Buy tickets</Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            );
        }

        return (
            <Container className="search-trip">
                <Row>
                    <Col className="mb-2">
                        <Label>from</Label>
                        <AutoCompleteInput name="origin" onChange={ this.handleInputChange } suggestions={ this.state.suggestions } placeholder="your home" />
                    </Col>
                    <Col className="mb-2">
                        <Label>to</Label>
                        <AutoCompleteInput name="destination"  onChange={ this.handleInputChange } suggestions={ this.state.suggestions } placeholder="your destination" />
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
                        <Button className="search" onClick={ this.searchTrips }>Search Trips</Button>
                    </Col>
                </Row>
                <Row>
                    <Col className={"alert justify-content-center " + alertClassName}>
                        <p>{this.state.alertText}</p>
                    </Col>
                </Row>

                <div className={"results p-4 mt-4 " + resultClassName}>
                    <div>
                        <h1>Results</h1>
                        <h2><span className="text-secondary">Trips from </span> { this.state.origin } <span className="text-secondary">to</span> { this.state.destination } </h2>
                        <h4><span className="text-secondary">between</span> { startDate.toLocaleDateString('pt-br') } <span className="text-secondary">and</span> { endDate.toLocaleDateString('pt-br') } </h4>
                        { results }
                    </div>
                </div>
            </Container>
        );
    }

}