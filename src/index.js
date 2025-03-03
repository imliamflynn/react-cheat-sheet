import React from 'react';
import ReactDOM from 'react-dom/client';

// -------------------------------------------------------------------------------------------------------------
// VARIABLES
// -------------------------------------------------------------------------------------------------------------

// Variable containing an HTML element written with JSX. JSX allows us to write HTML directly in JS code.
const elementWithJSX = <h3>I use JSX!</h3>;

// Variable containing an HTML element written without JSX.
const elementWithoutJSX = React.createElement('h3', {}, 'I do not use JSX!');

// -------------------------------------------------------------------------------------------------------------
// CLASSES
// -------------------------------------------------------------------------------------------------------------

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

// -------------------------------------------------------------------------------------------------------------
// ARROW FUNCTIONS
// -------------------------------------------------------------------------------------------------------------

// Arrow function syntax. Instead of hello = function() {... or function hello() {...
let hello = () => {
  return "Hello World!";
}

// Arrow function can be written without {} or return if it only has one statement.
let shortHello = () => "Hello World!";

// Arrow function with parameter.
let helloParam = (val) => "Hello " + val;

// Arrow function with parameter can be written without parentheses () if it only has one parameter.
let shortHelloParam = val => "Hello " + val;

// With arrow functions, the 'this' keyword always represents the object that defined the arrow function.
// In example below 'this' always refers to Header object no matter who called the function (window, button etc.)
class Header {
  constructor() {
    this.color = "Red";
  }

  changeColor = () => {
    document.getElementById("demo").innerHTML += this;
  }
}

// -------------------------------------------------------------------------------------------------------------
// ARRAY METHOD .map()
// -------------------------------------------------------------------------------------------------------------
// The .map() method allows you to run a function on each item in the array

const myArray = ['apple', 'banana', 'orange'];

// .map() method used to make a list from the above array.
const myList = myArray.map((item) => <li>{item}</li>)

// -------------------------------------------------------------------------------------------------------------
// DESTRUCTURING
// -------------------------------------------------------------------------------------------------------------

const vehicles = ['mustang', 'f-150', 'expedition'];

// Destructuring to assign array items to variables. The order that variables are declared is important.
const [car, truck, suv] = vehicles;

// If we only want the car and suv we can simply leave out the truck but keep the comma:
const [car2, , suv2] = vehicles;

// Destructuring comes in handy when a function returns an array.
function calculate(a, b) {
  const add = a + b;
  const subtract = a - b;
  const multiply = a * b;
  const divide = a / b;

  return [add, subtract, multiply, divide];
}

const [add, subtract, multiply, divide] = calculate(4, 7);

// Destructuring an object.
const vehicleOne = {
  brand: 'Ford',
  model: 'Mustang',
  type: 'car',
  year: 2021,
  color: 'red'
}

myVehicle(vehicleOne);

// Notice that the object properties do not have to be declared in a specific order.
function myVehicle({ type, color, brand, model }) {
  const message = 'My ' + type + ' is a ' + color + ' ' + brand + ' ' + model + '.';
}

// We can even destructure deeply nested objects by referencing the nested object then using
// a colon and curly braces to again destructure the items needed from the nested object:
const vehicleTwo = {
  brand: 'Ford',
  model: 'Mustang',
  type: 'car',
  year: 2021,
  color: 'red',
  registration: {
    city: 'Houston',
    state: 'Texas',
    country: 'USA'
  }
}

myVehicle2(vehicleTwo)

function myVehicle2({ model, registration: { state } }) {
  const message = 'My ' + model + ' is registered in ' + state + '.';
}




const title = <h1>React Cheat Sheet</h1>;

// Function Component which renders to "root" div in HTML.
function App() {
  return (
    <>
      {title}
      {elementWithJSX}
      {elementWithoutJSX}
      {myCar.info()}<br />
      {myCar.show()}<br />
      {hello()}<br />
      {shortHello()}<br />
      {helloParam("Liam!")}<br />
      {shortHelloParam("Liam!")}<br />
      <ol>{myList}</ol>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);