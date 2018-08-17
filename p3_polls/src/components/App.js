import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import React, { Component, Fragment } from 'react';

import { handleInitialData } from "../actions/shared";

import AddPoll from "./AddPoll";
import Dashboard from "./Dashboard";
import Leaderboard from "./Leaderboard";
import Nav from "./Nav";
import Poll from "./Poll";

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            {
              this.props.loading
              ? null
              : <div>
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route path="/polls/:id" component={Poll} />
                  <Route path="/add" component={AddPoll} />
                </div>
            }
          </div>
        </Fragment>
      </Router>
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
