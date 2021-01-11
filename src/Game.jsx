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
            player: [],
            computer: [],
        };

    async componentDidMount() {
        const request = await fetch('http://localhost:3001/card');
        const data = await request.json();
        const computer = [];
        const player = [];
        data.forEach((card, index) => {
            const animal = new Animal(card.name, card.image, card.size, card.weight, card.age, card.offspring, card.speed);
            if(index % 2 === 0) {
                computer.push(animal);
            } else {
                player.push(animal);
            }
        });
        this.setState(state => update(state, {player: {$set: player}, computer: {$set: computer},}),);
    }

    getSelectPropertyHandler() {

        return property => this.play(property);
    }

    compare(property) {
        console.log(property);
        let playersTurn = this.state.playersTurn;

        const firstPlayer = this.state.player[0];
        let player = update(this.state.player, { $splice: [[0, 1]] });

        const firstComputer = this.state.computer[0];
        let computer = update(this.state.computer, { $splice: [[0, 1]] });

        if (firstPlayer[property]>firstComputer[property]){
            playersTurn = true;
            player = update(player, {$push: [firstPlayer, firstComputer] });
            if(computer.length === 0){
                alert('Player wins'); return;
            }
        } else if(firstPlayer[property] < firstComputer[property]) {
            playersTurn = false;
            computer = update(computer, { $push: [firstPlayer] });
            if (player.length===0){
                alert('Computer wins'); return;
            }
        } else {
            player = update(player, { $push: [firstPlayer] });
            computer = update(computer, { $push: [firstComputer] });
        }
        this.setState(
            state =>
                update(state, {
                    $set: {
                        computerUncovered: false,
                        selectedProperty: '',
                        playersTurn,
                        player,
                        computer,
                    },
                }),
                () => {
                if(!playersTurn){
                    setTimeout(()=> {
                        const property = this.selectRandomProperty();
                        this.play(property);
                    }, 2000);
                }
            },
        );
    }

    play(property) {
        this.setState(
            state =>
                update(this.state, {
                    selectedProperty: { $set: property },
                    computerUncovered: { $set: true },
                }),
            () => {
                setTimeout(() => {
                    this.compare(property);
                }, 2000);
            },
        );
    }

    selectRandomProperty() {
        const properties = Object.keys(Animal.properties);
        const index = Math.floor(Math.random()* properties.length);
        return properties[index];
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
                    {player[0] && (
                    <Card animal={player[0]} uncovered={true} selectedProperty={selectedProperty} onSelectProperty={this.getSelectPropertyHandler()}/>)}
                    {computer [0] && (
                    <Card animal={computer[0]} uncovered={computerUncovered} selectedProperty={selectedProperty}/>)}
                </div>
            </div>
        );
    }
}