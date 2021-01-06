import React, { Component } from 'react';

import Card from './Card.jsx';
import './App.css';
import Animal from "./Animal";

export default class App extends Component {
  render() {
      const animal = new Animal('Elefant', 'placeholder.jpg', 3.3, 6000, 70, 1 , 50);
    return (
        <div>
          <h1>Supertrumpf</h1>
          <Card animal={animal} uncovered={true} />
        </div>
    );
  }
}
