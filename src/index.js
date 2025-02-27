import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from "react";


function Garage(props) {
  const cars = props.cars;
  return (
    <>
      <h1>Garage</h1>
      {cars.length > 0 &&
      <>
        <h2>
          You have {cars.length} cars in your garage.
        </h2>
        <p>
          {cars}
        </p>
        </>
      }
    </>
    
  );
}

function MissedGoal() {
  return <h1>MISSED!</h1>;
}

function MadeGoal() {
  return <h1>GOAL!</h1>;
}

function Goal(props) {
  const isGoal = props.isGoal;
  return (
    <>
      { isGoal ? <MadeGoal/> : <MissedGoal/> }
    </>
  );
}

function Car(props) {
  return <li>I am a { props.brand }</li>;
}

function Garage2() {
  const cars = [
    {id: 1, brand: 'Ford'},
    {id: 2, brand: 'BMW'},
    {id: 3, brand: 'Audi'}
  ];
  return (
    <>
      <h1>Who lives in my garage?</h1>
      <ul>
        {cars.map((car) => <Car key={car.id} brand={car.brand} />)}
      </ul>
    </>
  );
}

function MyForm() {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); //Stops page from refreshing
    alert(`The name you entered was: ${name}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your name:
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
  )
}

const cars = ['Ford', 'BMW', 'Audi'];
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Garage cars={cars} />);

const root2 = ReactDOM.createRoot(document.getElementById('root2'));
root2.render(<Goal isGoal={true} />);

const root3 = ReactDOM.createRoot(document.getElementById('root3'));
root3.render(<Garage2 />);

const root4 = ReactDOM.createRoot(document.getElementById('root4'));
root4.render(<MyForm />);