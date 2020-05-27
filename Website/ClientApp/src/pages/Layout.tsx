import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from '../components/NavMenu/NavMenu';
import './Layout.scss';

export class Layout extends Component<{}, {}> {
    static displayName = Layout.name;

    render () {
        return (
            <div>
                <NavMenu />
                <Container fluid className="full">
                    {this.props.children}
                </Container>
                <div className="chatbot">
                    <div className="title py-2 px-3">Converse com nosso chatbot!</div>
                    <iframe title="chatbot" src='https://webchat.botframework.com/embed/hittheroad-chatbot?s=Ubod1S21tn4.CzdOG9JJguseN6lhWvzn9KQVcnvvoJYi7mt58RoBpB0'></iframe>
                </div>
            </div>
        );
    }
}
