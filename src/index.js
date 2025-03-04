import React, { useState, useEffect, createContext, useContext, memo } from 'react';
import ReactDOM from 'react-dom/client';
import { name, age } from "./person.js"; // Named exports must be destructured using curly braces.
import message from "./message.js"; // Default exports do not.
import Comp from "./Comp.js"; // Component in seperate file.

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
// FUNCTION COMPONENTS
// -------------------------------------------------------------------------------------------------------------
// IT IS RECOMMENDED TO SPLIT YOUR COMPONENTS INTO SEPARATE FILES. React is all about re-using
// code. See Comp.js for example. Note that the filename must start with an uppercase character.
// I have imported the Comp.js file in the application (see import statement up top), now we can
// use it as if it was created here.
// Components are like functions that return HTML elements. You can have components inside
// other components (see App component at bottom).

// A component's name MUST start with an upper case letter or it won't work. To use this
// component in your application, use similar syntax as normal HTML: <FirstComponent />
function FirstComponent() {
  return <h2>Hi, I am a function component!</h2>;
}

class GrossComponent extends React.Component {
  render() {
    return <h4>Hi, I am a class component. Never use me.</h4>;
  }
}

// -------------------------------------------------------------------------------------------------------------
// MODULES
// -------------------------------------------------------------------------------------------------------------

// Named Exports - You can export a function or variable from any file. I have
// created a file named person.js, and filled it with things we want to export.

// Default Exports - I have created another file, named message.js, and used it for
// demonstrating default export. You can only have one default export in a file.

// See top of file for imports.

// -------------------------------------------------------------------------------------------------------------
// HOOKS
// -------------------------------------------------------------------------------------------------------------
// Hooks allow function components to "hook" into React features such as state
// and lifecycle methods. You must import Hooks from react.

// Hook Rules:
// 1. Hooks can only be called inside React function components.
// 2. Hooks can only be called at the top level of a component.
// 3. Hooks cannot be conditional.

// USE STATE HOOK

// State generally refers to application data or properties that need to be tracked.
// We initialize our state by calling useState at the top of our component.
function FavoriteColor() {
  // useState accepts an initial state and returns two values:
  // - The current state. 'color'
  // - A function that updates the state. 'setColor'
  const [color, setColor] = useState(""); // Destructuring color and setColor.

  // We then use the state in our rendered component.
  // To update the state, we use our state updater function. Never directly
  // update state. Ex: color = "red". It is not allowed.
  return (
    <>
      <h1>My favorite color is {color}!</h1>
      <button
        type="button"
        onClick={() => setColor("blue")}
      >Blue</button>
      <button
        type="button"
        onClick={() => setColor("red")}
      >Red</button>
      <button
        type="button"
        onClick={() => setColor("pink")}
      >Pink</button>
      <button
        type="button"
        onClick={() => setColor("green")}
      >Green</button>
    </>
  );
}

// We can store an object in state. Need to reference object.property.
function CarHook() {
  const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red"
  });

  return (
    <>
      <h1>My {car.brand}</h1>
      <p>
        It is a {car.color} {car.model} from {car.year}.
      </p>
    </>
  )
}

// When state is updated, the entire state gets overwritten. What if we only want to update the
// color of our car? If we only called setCar({color: "blue"}), this would remove the brand, model,
// and year from our state. We can use the spread operator to help.
function CarHook2() {
  const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red"
  });

  // Because we need the current value of state, we pass a function into our setCar function. This
  // function receives the previous value. We then return an object, spreading the previousState
  // and overwriting only the color.
  const updateColor = () => {
    setCar(previousState => {
      return { ...previousState, color: "blue" }
    });
  }

  return (
    <>
      <h1>My {car.brand}</h1>
      <p>
        It is a {car.color} {car.model} from {car.year}.
      </p>
      <button
        type="button"
        onClick={updateColor}
      >Blue</button>
    </>
  )
}

// USE EFFECT HOOK

// The useEffect Hook allows you to perform side effect in components. Ex: fetching data,
// directly updating DOM, and timers. useEffect accepts two arguments. The second argument
// is optional. useEffect(<function>, <dependency>)

// No dependency passed:
function Example1() {
  useEffect(() => {
    // Runs on every render
  });
}

function Example2() {
  useEffect(() => {
    // Runs only on the first render.
  }, []);
}

function Example3() {
  let num1, num2 = 0;
  useEffect(() => {
    // Runs on the first render, and any time any dependency value changes.
  }, [num1, num2]); // Can have 1 or many dependencies.
}

// Renders once, then anytime count is updated by clicking the button.
function Counter() {
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    setCalculation(() => count * 2);
  }, [count]); // <- If there are multiple dependencies, include them in the dependency array.

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <p>Calculation: {calculation}</p>
    </>
  );
}

// Some effects require cleanup to reduce memory leaks. Timeouts, subscriptions, event listeners,
// and other effects that are no longer needed should be disposed. We do this by including a
// return function at the end of the useEffect Hook.
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);

    return () => clearTimeout(timer)
  }, []);

  return <h1>I've rendered {count} times!</h1>;
}

// CREATE CONTEXT HOOK

// React Context is a way to manage state globally.

// To create context, you must Import createContext and initialize it.
const UserContext = createContext();

// Next we'll use the Context Provider to wrap the tree of components that need the state
// context. Wrap child components in the Context Provider and supply the state value.
function Component1() {
  const [user, setUser] = useState("Jesse Hall");

  return (
    <UserContext.Provider value={user}>
      <h1>Component 1</h1>
      <h2>{`Hello ${user}!`}</h2>
      <Component2 user={user} />
    </UserContext.Provider>
  ); // Now, all components in this tree will have access to the user Context.
}

function Component2({ user }) {
  return (
    <>
      <h1>Component 2</h1>
      <Component5 />
    </>
  );
}

// USE CONTEXT HOOK

// In order to use the Context in a child component, we need to access it using the
// useContext Hook. First, include the useContext in the import statement.

// Then you can access the user Context in all components:
function Component5() {
  const user = useContext(UserContext);

  return (
    <>
      <h1>Component 5</h1>
      <h2>{`Hello ${user} again!`}</h2>
    </>
  );
}

// -------------------------------------------------------------------------------------------------------------
// MEMO
// -------------------------------------------------------------------------------------------------------------
// Using memo will cause React to skip rendering a component if its props have not changed.
// This can improve performance.

// Without the memos keyword, the below example re-renders the Todos when the increment
// button is clicked. With the Todos component export wrapped with memo, Todos only
// re-renders when the todos that are passed to it through props are updated.
/*
index.js:
import { useState } from "react";
import ReactDOM from "react-dom/client";
import Todos from "./Todos";

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState(["todo 1", "todo 2"]);

  const increment = () => {
    setCount((c) => c + 1);
  };

  return (
    <>
      <Todos todos={todos} />
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


Todos.js:
import { memo } from "react";

const Todos = ({ todos }) => {
  console.log("child render");
  return (
    <>
      <h2>My Todos</h2>
      {todos.map((todo, index) => {
        return <p key={index}>{todo}</p>;
      })}
    </>
  );
};

export default memo(Todos); // Previous code: export default Todos;
*/

// -------------------------------------------------------------------------------------------------------------
// PROPS (PROPERTIES)
// -------------------------------------------------------------------------------------------------------------
// Props are arguments passed into React components.
// You can send variables/objects as props by wrapping the variable in curly brackets {}.
// Props are read only! You will get an error if you try to change their value.

// To send props into a component, use the same syntax as HTML attributes: <Supermarket brand="Pak n Save" />
function Supermarket(props) {
  return <h2>I am {props.brand}!</h2>;
}

// You can pass data from one component to another e.g. send brand from Garage to Truck.
function Truck(props) {
  return <h2>I am a {props.brand.model}!</h2>;
}

function Garage() {
  const carInfo = { name: "Ford", model: "F-150" };
  return (
    <>
      <h1>Who lives in my garage?</h1>
      <Truck brand={carInfo} />
    </>
  );
}

// -------------------------------------------------------------------------------------------------------------
// EVENTS
// -------------------------------------------------------------------------------------------------------------
// React events are written in camelCase, unlike HTML.
// React event handlers are written inside curly brackets, unlike HTML.
// onClick={shoot}  instead of onclick="shoot()"

function Football() {
  // No args: const shoot = () => {
  // Args: const shoot = (a) => {
  const shoot = (a, b) => {
    // alert("Great Shot!");
    alert(a); // Goal!
    alert(b.type); // b.type = click. b = [object Object]
  }

  return (
    // No args: <button onClick={shoot}>Take the shot!</button>
    // Args: <button onClick={() => shoot("Goal!")}>Take the shot!</button>
    <button onClick={(event) => shoot("Goal!", event)}>Take the shot!</button> // Args + event
  );
}

// -------------------------------------------------------------------------------------------------------------
// CONDITIONAL RENDERING
// -------------------------------------------------------------------------------------------------------------

function MissedGoal() {
  return <h1>MISSED!</h1>;
}

function MadeGoal() {
  return <h1>Goal!</h1>;
}

function Goal(props) {
  const isGoal = props.isGoal;
  if (isGoal) {
    return <MadeGoal />;
  }
  return <MissedGoal />;
}

// root.render(<Goal isGoal={false} />);

// Using the && operator
function ConditionalGarage(props) {
  const cars = props.cars;
  return (
    <>
      <h1>Garage</h1>
      {cars.length > 0 && // If cars.length > 0, the expression after && will render.
        <h2>
          You have {cars.length} cars in your garage.
        </h2>
      }
    </>
  );
}

//const cars = ['Ford', 'BMW', 'Audi'];
//root.render(<ConditionalGarage cars={cars} />);

// Using the ternary operator.
function Goal2(props) {
  const isGoal = props.isGoal;
  return (
    <>
      {isGoal ? <MadeGoal /> : <MissedGoal />}
    </>
  );
}

// root.render(<Goal isGoal={false} />);

// -------------------------------------------------------------------------------------------------------------
// LISTS / .map()
// -------------------------------------------------------------------------------------------------------------
// The .map() method allows you to run a function on each item in the array

const myArray = ['apple', 'banana', 'orange'];

// .map() method used to make a list from the above array.
// When you run this code it will work but you will receive a warning
// that there is no "key" provided for the list items.
const myList = myArray.map((item) => <li>{item}</li>)

function CarList(props) {
  return <li>I am a {props.brand}</li>;
}

// Keys allow React to keep track of elements. This way, if an item is updated or removed,
// only that item will be re-rendered instead of the entire list. Keys need to be unique
// to each sibling. But they can be duplicated globally.
function GarageList() {
  const cars = [
    { id: 1, brand: 'Ford' },
    { id: 2, brand: 'BMW' },
    { id: 3, brand: 'Audi' }
  ];
  return (
    <>
      <h1>Who lives in my garage?</h1>
      <ul>
        {cars.map((car) => <CarList key={car.id} brand={car.brand} />)}
      </ul>
    </>
  );
}

// root.render(<GarageList />);

// -------------------------------------------------------------------------------------------------------------
// FORMS
// -------------------------------------------------------------------------------------------------------------
// You add a form in React like any other element. Normally the form will submit and the page
// will refresh. But this is generally not what we want to happen in React. We want to prevent
// this default behavior and let React control the form.

// Uses component state to store data. MUST HAVE import { useState } from 'react'.
function MyForm() {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents default submit and refresh.
    alert(`The name you entered was: ${name}`)
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

// You can control the values of more than one input field by adding a name attribute to each element.
// We will initialize our state with an empty object. To access the fields in the event handler use
// the event.target.name and event.target.value syntax. To update the state, use square brackets [] 
// notation around the property name.
function MultipleInputFieldsForm() {
  const [inputs, setInputs] = useState({});

  // We use the same event handler function for both input fields, we could write one event handler
  // for each, but this gives us much cleaner code and is the preferred way in React.
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs.username + " " + inputs.age);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your name:
        <input
          type="text"
          name="username"
          value={inputs.username || ""}
          onChange={handleChange}
        />
      </label>
      <label>Enter your age:
        <input
          type="number"
          name="age"
          value={inputs.age || ""}
          onChange={handleChange}
        />
      </label>
      <input type="submit" />
    </form>
  )
}

// Textarea is different in React from HTML. the value of a textarea is placed in a value
// attribute. We'll use the useState Hook to manage the value of the textarea.
function Textarea() {
  const [textarea, setTextarea] = useState(
    "The content of a textarea goes in the value attribute"
  );

  const handleChange = (event) => {
    setTextarea(event.target.value)
  }

  return (
    <form>
      <textarea value={textarea} onChange={handleChange} />
    </form>
  )
}

// Select is different in React from HTML. The selected value is defined with a
// value attribute on the select tag.
function Select() {
  const [myCar, setMyCar] = useState("Volvo");

  const handleChange = (event) => {
    setMyCar(event.target.value)
  }

  return (
    <form>
      <select value={myCar} onChange={handleChange}>
        <option value="Ford">Ford</option>
        <option value="Volvo">Volvo</option>
        <option value="Fiat">Fiat</option>
      </select>
    </form>
  )
}

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
// ROUTER
// -------------------------------------------------------------------------------------------------------------
// Create React App doesn't include page routing. React Router is the most popular solution.
// To add React Router run this in the terminal from the root directory of the application.
// npm i -D react-router-dom

/*
To create an application with multiple page routes, let's first start with the file structure.
Within the src folder, we'll create a folder named pages with several files:

src\pages\:
  Layout.js
  Home.js
  Blogs.js
  Contact.js
  NoPage.js
Each file will contain a very basic React component.

Now we will use our Router in our index.js file:
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

Example Explained:
We wrap our content first with <BrowserRouter>.
Then we define our <Routes>. An application can have multiple <Routes>. Our basic example only uses one.
<Route>s can be nested. The first <Route> has a path of / and renders the Layout component.
The nested <Route>s inherit and add to the parent route. So the blogs path is combined with the parent and becomes /blogs.
The Home component route does not have a path but has an index attribute. That specifies this route as the default route for the parent route, which is /.
Setting the path to * will act as a catch-all for any undefined URLs. This is great for a 404 error page.

Pages / Components:
The Layout component has <Outlet> and <Link> elements.
The <Outlet> renders the current route selected.
<Link> is used to set the URL and keep track of browsing history.
Anytime we link to an internal path, we will use <Link> instead of <a href="">.
The "layout route" is a shared component that inserts common content on all pages, such as a navigation menu.

Layout.js:
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;


Home.js:
const Home = () => {
  return <h1>Home</h1>;
};

export default Home;


NoPage.js:
const NoPage = () => {
  return <h1>404</h1>;
};

export default NoPage;
*/

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
// TERNARY OPERATOR
// -------------------------------------------------------------------------------------------------------------

let authenticated = true;
let renderApp = () => "App Rendered";
let renderLogin = () => "Login Rendered";

// The ternary operator is a simplified conditional operator like if / else.
// Syntax: condition ? <expression if true> : <expression if false>
authenticated ? renderApp() : renderLogin();

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
// CSS WITH REACT
// -------------------------------------------------------------------------------------------------------------

// To style an element with the inline style attribute, the value must be a JavaScript object.
// Note: In JSX, JavaScript expressions are written inside curly braces, and since JavaScript
// objects also use curly braces, hence two sets of curly braces {{}} below.
const inline = <h1 style={{ color: "red" }}>Hello Style!</h1>;

// Properties with hyphen seperators become camel case.
// Use backgroundColor instead of background-color.
const camel = <h1 style={{ backgroundColor: "lightblue" }}>Hello Style!</h1>

// You can also create an object with styling information, and refer to it in the style attribute.
const StyleHeader = () => {
  const myStyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Sans-Serif"
  };
  return (
    <>
      <h1 style={myStyle}>Hello Style!</h1>
      <p>Add a little style!</p>
    </>
  );
}

// You can use external stylesheets like with HTML. Make sure to import the file e.g.:
// import './App.css';

/*
Another way of adding styles to your application is to use CSS Modules.
CSS Modules are convenient for components that are placed in separate files.
The CSS inside a module is available only for the component that imported it, and you
do not have to worry about name conflicts.
Create the CSS module with the .module.css extension, example: my-style.module.css.

my-style.module.css:
.bigblue {
  color: DodgerBlue;
  padding: 40px;
  font-family: Sans-Serif;
  text-align: center;
}

Car.js:
import styles from './my-style.module.css'; 

const Car = () => {
  return <h1 className={styles.bigblue}>Hello Car!</h1>;
}

export default Car;

index.js:
import ReactDOM from 'react-dom/client';
import Car from './Car.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Car />);
*/

const title = <h1>React Cheat Sheet</h1>;

// Function component which returns HTML code.
function App() {
  return (
    <>
      <div id="root2"></div>
      {title}
      {elementWithJSX}
      {elementWithoutJSX}
      {expressionElement}
      {fruitBowl}
      <FirstComponent />
      <Comp />
      <GrossComponent />
      <Supermarket brand="Pak n Save" />
      <FavoriteColor /><br />
      <Component1 />
      <MultipleInputFieldsForm />
      {myCar.info()}<br />
      {myCar.show()}<br />
      {hello()}<br />
      {shortHello()}<br />
      {helloParam("Liam!")}<br />
      {shortHelloParam("Liam!")}<br />
      <ol>{myList}</ol>
      <Football />
    </>
  );
}

// Creates root on defined HTML element.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />); // Renders HTML code from App() to root node.