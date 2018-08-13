// import React from "react";
// import { render } from "react-dom";

const Context = React.createContext();

function Parent () {
  return (
    <div>
      <h1>Parent</h1>
      <Child />
    </div>
  );
}

function Child () {
  return (
    <div>
      <h2>Child</h2>
      <Grandchild />
    </div>
  );
}

function Grandchild () {
  return (
    <Context.Consumer>
      {
        name => (
          <div>
            <h3>Grandchild: {name}</h3>
          </div>
        )
      }
    </Context.Consumer>
  );
}

class App extends React.Component {
  render () {
    const name = "Default Name";
    return (
      <Context.Provider value={name}>
        <Parent />
      </Context.Provider>
    );
  }
}

render(<App />, document.getElementById("root"));
