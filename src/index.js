import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <>
      {title}
    </>
  );
}

const title = <h1>React Cheat Sheet</h1>;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);