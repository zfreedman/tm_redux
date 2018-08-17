import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import React, { Component } from 'react';

import { handleInitialData } from "../actions/shared";

import AddPoll from "./AddPoll";
import Dashboard from "./Dashboard";
import Leaderboard from "./Leaderboard";

class App extends Component {
  render() {
    return (
      <div>
        <LoadingBar />
        {
          this.props.loading
            ? null
            : <AddPoll />
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
