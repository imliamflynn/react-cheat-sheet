import React from 'react';
import ReactDOM from 'react-dom/client';
// Named exports must be destructured using curly braces.
import { name, age } from "./person.js";
// Default exports do not.
import message from "./message.js";

// -------------------------------------------------------------------------------------------------------------
// VARIABLES / JSX
// -------------------------------------------------------------------------------------------------------------

// Variable containing an HTML element written with JSX. JSX allows us to write HTML directly in JS code.
const elementWithJSX = <h2>I use JSX!</h2>;

// Variable containing an HTML element written without JSX.
const elementWithoutJSX = React.createElement('h3', {}, 'I do not use JSX!');

// With JSX you can write expressions inside curly braces { }. The expression
// can be a React variable, or property, or any other valid JavaScript expression.
// JSX will execute the expression and return the result.
const expressionElement = <h4>React is {5 + 5} times better with JSX!</h4>;

// To write HTML on multiple lines, put the HTML inside parentheses.
const fruitBowl = (
  <ul>
    <li>Apples</li>
    <li>Bananas</li>
    <li>Cherries</li>
  </ul>
);

// The HTML code must be wrapped in ONE top level element. So if you like to write
// two paragraphs, you must put them inside a parent element, like a div element.
const wrap = (
  <div>
    <p>I am a paragraph.</p>
    <p>I am a paragraph too.</p>
  </div>
);

// Alternatively, you can use a "fragment" to wrap multiple lines. This will prevent
// unnecessarily adding extra nodes to the DOM. A fragment looks like an empty HTML tag: <></>.
const fragmentWrap = (
  <>
    <p>I am a paragraph.</p>
    <p>I am a paragraph too.</p>
  </>
);

// JSX follows XML rules, and therefore HTML elements must be properly closed with '/>'.
const closed = <input type="text" />;

// Use attribute className instead. 'Class' keyword is reserved.
const className = <h1 className="myclass">Hello World</h1>;

// To be able to use conditional statements in JSX, you should put the if statements outside of the JSX.
const x = 5;
let text = "Goodbye";

if (x < 10) {
  text = "Hello";
}

const conditional = <h1>{text}</h1>;

// Or you could use a ternary expression inside JSX.
const myElement = <h1>{(x) < 10 ? "Hello" : "Goodbye"}</h1>;

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

// -------------------------------------------------------------------------------------------------------------
// SPREAD OPERATOR
// -------------------------------------------------------------------------------------------------------------

// The JavaScript spread operator (...) allows us to quickly copy all or 
// part of an existing array or object into another array or object.
const numbersOne = [1, 2, 3];
const numbersTwo = [4, 5, 6];
const numbersCombined = [...numbersOne, ...numbersTwo];

// The spread operator is often used in combination with destructuring.
const numbers = [1, 2, 3, 4, 5, 6];

// Assign the first and second items from numbers to variables and put the rest in an array.
const [one, two, ...rest] = numbers;

// We can use the spread operator with objects too:
const myVehicleObj = {
  brand: 'Ford',
  model: 'Mustang',
  color: 'red'
}

const updateMyVehicle = {
  type: 'car',
  year: 2021,
  color: 'yellow'
}

const myUpdatedVehicle = { ...myVehicleObj, ...updateMyVehicle }
console.log(myUpdatedVehicle);
// Check the result object in the console. Notice the properties that did not match were
// combined, but the property that did match, color, was overwritten by the last object
// that was passed, updateMyVehicle. The resulting color is now yellow.

// -------------------------------------------------------------------------------------------------------------
// MODULES
// -------------------------------------------------------------------------------------------------------------

// Named Exports - You can export a function or variable from any file. I have
// created a file named person.js, and filled it with things we want to export.

// Default Exports - I have created another file, named message.js, and used it for
// demonstrating default export. You can only have one default export in a file.

// See top of file for imports.

// -------------------------------------------------------------------------------------------------------------
// TERNARY OPERATOR
// -------------------------------------------------------------------------------------------------------------

let authenticated = true;
let renderApp = () => "App Rendered";
let renderLogin = () => "Login Rendered";

// The ternary operator is a simplified conditional operator like if / else.
// Syntax: condition ? <expression if true> : <expression if false>
authenticated ? renderApp() : renderLogin();



const title = <h1>React Cheat Sheet</h1>;

// Function Component which renders to "root" div in HTML.
function App() {
  return (
    <>
      {title}
      {elementWithJSX}
      {elementWithoutJSX}
      {expressionElement}
      {fruitBowl}
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