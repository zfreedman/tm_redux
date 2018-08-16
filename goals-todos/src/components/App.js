import React from 'react';
import { connect } from "react-redux";
import ConnectedGoals from "./Goals";
import ConnectedTodos from "./Todos";
import { handleInitialData } from "../actions/shared";

class App extends React.Component {
  render() {
    if (this.props.loading === true) {
      return <h3>Loading</h3>;
    }

    return (
      <div>
        <ConnectedTodos />
        <ConnectedGoals />
      </div>
    );
  }

  componentDidMount () {
    const { dispatch } = this.props;

    // initial data fetch
    dispatch(handleInitialData());
  }
}

export default connect(state => ({
  loading: state.loading
}))(App);
