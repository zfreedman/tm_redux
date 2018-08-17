import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import React, { Component } from 'react';

import { handleInitialData } from "../actions/shared";

import Dashboard from "./Dashboard";

class App extends Component {
  render() {
    return (
      <div>
        <LoadingBar />
        {
          this.props.loading
            ? null
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
