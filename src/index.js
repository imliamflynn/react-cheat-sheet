import React from 'react';
import ReactDOM from 'react-dom/client';

// Variable containing an HTML element written with JSX. JSX allows us to write HTML directly in JS code.
const elementWithJSX = <h3>I use JSX!</h3>;

// Variable containing an HTML element written without JSX.
const elementWithoutJSX = React.createElement('h3', {}, 'I do not use JSX!');

// Class with a constructor and a method. Constructors are called when
// the object is initalised. Classes start with a capital letter.
class Car {
  constructor(name) {
    this.brand = name;
  }

  info() {
    return 'I have a ' + this.brand;
  }
}

// Class which inherits the Car class via the extends keyword.
// It inherits the properties and methods from the parent class.
// By calling the super() method in the constructor method, we call the parent's
// constructor method and get access to the parent's properties and methods.
class Model extends Car {
  constructor(name, mod) {
    super(name);
    this.model = mod;
  }
  show() {
    return this.info() + ', it is a ' + this.brand + ' ' + this.model
  }
}

// Object created using the Model class.
const myCar = new Model("Ford", "Mustang");



const title = <h1>React Cheat Sheet</h1>;

function App() {
  return (
    <>
      {title}
      {elementWithJSX}
      {elementWithoutJSX}
      {myCar.info()}<br />
      {myCar.show()}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);