import React, { Component } from 'react';
import { Input } from 'reactstrap';

import './AutoCompleteInput.scss';

interface IAutoCompleteProps
{
    suggestions: string[],
    placeholder: string,
    name: string,
    onChange: (val: string, name: string) => void
}

interface IAutoCompleteState
{
    activeSuggestion: number,
    filteredSuggestions: string[],
    showSuggestions: boolean,
    inputValue: string
}

export class AutoCompleteInput extends Component<IAutoCompleteProps, IAutoCompleteState>
{
    constructor(props: IAutoCompleteProps)
    {
        super(props);
        this.state = { activeSuggestion: 0, filteredSuggestions: this.props.suggestions, showSuggestions: false, inputValue: '' };
        this.selectSuggestion = this.selectSuggestion.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.openSuggestionList = this.openSuggestionList.bind(this);
    }

    openSuggestionList()
    {
        this.setState({ showSuggestions: true });
    }

    selectSuggestion(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>)
    {
        e.preventDefault();

        let index = this.state.filteredSuggestions.indexOf(e.currentTarget.text);

        this.setState({
            activeSuggestion: index,
            showSuggestions: false,
            inputValue: e.currentTarget.text
        }, () => {
            this.props.onChange(this.state.inputValue, this.props.name)
        });
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>)
    {
        let filteredSuggestions: string[];

        if (e.target.value === "")
        {
            filteredSuggestions = this.props.suggestions;
        }
        else
        {
            filteredSuggestions = this.props.suggestions.filter( suggestion => suggestion.toLowerCase().includes(e.target.value.toLowerCase()));
        }

        this.setState({
            inputValue: (e.target.value === "") ? "" : e.target.value,
            filteredSuggestions: filteredSuggestions
        }, () => 
        {
            this.props.onChange(this.state.inputValue, this.props.name);
        });
    }

    handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>)
    {
        if (e.keyCode === 13)
        {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                inputValue: this.state.filteredSuggestions[this.state.activeSuggestion]
            }, () => {
                this.props.onChange(this.state.inputValue, this.props.name)
            });
        }
        else if (e.keyCode === 40)
        {
            if (this.state.activeSuggestion - 1 === this.state.filteredSuggestions.length)
            {
                return;
            }

            this.setState({ activeSuggestion: this.state.activeSuggestion + 1 });
        }
        else if (e.keyCode === 38)
        {
            if (this.state.activeSuggestion === 0)
            {
                return;
            }

            this.setState({ activeSuggestion: this.state.activeSuggestion - 1 });
        }
    }

    render ()
    {
        let suggestionList;

        if (this.state.showSuggestions && this.state.inputValue)
        {
            if (this.state.filteredSuggestions.length)
            {
                suggestionList = (
                    <div className="suggestions-list">
                        <ul>
                            {
                                this.state.filteredSuggestions.map((suggestion, index) => {
                                    let className;

                                    if (index === this.state.activeSuggestion)
                                        className = "active"

                                    return (
                                        <li key={index}><a href="#" className={className} onClick={ this.selectSuggestion }>{ suggestion }</a></li>                                    
                                    )
                                })
                            }
                        </ul>
                    </div>
                )
            }
        }
        return (
            <div className="autocomplete-input">
                <Input value={ this.state.inputValue } onClick={ this.openSuggestionList } onFocus={ this.openSuggestionList } onChange={ this.handleChange } onKeyDown={ this.handleKeyDown } placeholder={ this.props.placeholder } />
                { suggestionList }
            </div>  
        )
    }
} 