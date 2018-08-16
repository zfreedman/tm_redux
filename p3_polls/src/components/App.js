import { connect } from "react-redux";
import React, { Component } from 'react';

import { handleInitialData } from "../actions/shared";

import Dashboard from "./Dashboard";

class App extends Component {
  render() {
    return (
      <div>
        {
          this.props.loading
            ? "Loading"
            : <Dashboard />
        }
      </div>
    )
  }

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
}

let mapStateToProps = ({ authedUser}) => ({
  loading: authedUser === null
});

export default connect(mapStateToProps)(App);
