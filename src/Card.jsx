import * as React from 'react';


import './Card.css';
import Animal from './Animal.js';

const uncovered = false;

export default function Card() {
    const elephant = new Animal(
        'Elefant', 'placeholder.png', 3.3, 6000, 70, 1, 40,
    );
    const front = (
        <div className="card">
            <h1>{elephant.name}</h1>
            <img alt="Elefant" src={`${process.env.PUBLIC_URL}${elephant.image}`}
                 height="200" width="200"/>
            <table>
                <tbody>
                {Object.keys(Animal.properties).map(property =>{
                    const animalProperty = Animal.properties[property];
                    return (
                        <tr key={property}>
                            <td>{animalProperty.label}</td>
                            <td>
                                {elephant[property]}&nbsp;
                                {animalProperty.unit}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
    const back = <div className="card back" />
    if(uncovered){
        return front;
    } else {
        return back;
    }

}