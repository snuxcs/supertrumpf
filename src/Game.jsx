import * as React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

import './Game.css';
import Card from './Card.jsx';
import Animal from './Animal.js';

export default class Game extends React.Component {
    static defaultProps = {
        title: 'Supertrumpf',
    };
    static propTypes = {
        title: PropTypes.string,
    }
    state = {
            computerUncovered: false,
            selectedProperty: '',
            playersTurn: true,
            player: [new Animal('Elefant', 'placeholder.jpg', 3.3, 6000, 70, 1, 40)],
            computer: [new Animal('Nashorn', 'placeholder.jpg', 1, 9, 2300, 50, 1, 50)],
        };
    getSelectedPropertyHandler() {
        return property =>
            this.setState((state) =>
                update(this.state, {
                    selectedProperty: {$set: property },
                    computerUncovered: { $set: true },
                    }),
                );
    }
    render() {
        const { playersTurn, player, computer, selectedProperty, computerUncovered } = this.state;
        return(
            <div>
                <h1>{this.props.title}</h1>
                <div className="info">
                    {playersTurn ? 'Du bist ' : 'Der Computer ist'} an der Reihe
                </div>
                <div className="cards">
                    <Card animal={player[0]} uncovered={true} selectedProperty={selectedProperty} onSelectProperty={this.getSelectedPropertyHandler()}/>
                    <Card animal={computer[0]} uncovered={computerUncovered} selectedProperty={selectedProperty}/>
                </div>
            </div>
        );
    }
}