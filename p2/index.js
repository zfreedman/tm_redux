import React from "react";
import { render } from "react-dom";

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

function Grandchild ({ name }) {
  return (
    <div>
      <h3>Grandchild: {name}</h3>
    </div>
  );
}

class App extends React.Component {
  render () {
    const name = "Default Name";
    return <Parent />;
  }
}

render(<App />, document.getElementById("root"));
