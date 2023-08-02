import React from "react";

import Die from "./Die";
import {nanoid} from "nanoid";
import Confetti from "react-confetti"

export default function Main(){
    const [dice, setDice] = React.useState(allNewDice())         // creating state to hold the array which contains random nos.
    const [tenzies, setTenzies] = React.useState(false)          // creating state to tell user whether user has won or not
    
    React.useEffect(() => {                              // this will run everytime when state changes
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value   
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You won!")
        }
    }, [dice])

    function allNewDice()                       // generating array of size 10 containing random nos.
    {
        const newDice = [];
        for(let i = 0; i < 10; i++)
        {
            newDice.push({
                value: Math.ceil(Math.random() * 6), 
                isHeld: false,
                id: nanoid()
            })
        }
        return newDice;
    }
    
    function rollDice(){
        if(!tenzies)                              // if game not won yet
        {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?                            // holding the die whose isHeld value is true
                    die :                                          
                    {  value: Math.ceil(Math.random() * 6),        // remaining elements value will be generated randomly
                    isHeld: false,
                    id: nanoid()
                    }
            }))
        }
        else                            // if game won , so what happens after clicking "NEW GAME" button is defined in else condition
        {
            setTenzies(false)
            setDice(allNewDice())
        }
    }

    function holdDice(id) {                     // to change the properties of only that element, which is currently clicked/ or visited 
        setDice(oldDice => oldDice.map(die => {          // we can do it using "for" loop also
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }

    const diceElements = dice.map(die => (              // mapping over the state to get the elements in the component form
        <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>
    ))       

    return (
        <main>
            {tenzies && <Confetti />}              
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}