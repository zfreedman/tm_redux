import { connect } from "react-redux";
import React, { Component } from 'react';

import { handleInitialData } from "../actions/shared";

class App extends Component {
  render() {
    return (
      <div>
        Starter Code.
      </div>
    )
  }

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
}

export default connect()(App);
