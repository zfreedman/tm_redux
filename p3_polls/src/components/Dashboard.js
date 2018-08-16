import React from "react";
import { connect } from "react-redux";

class Dashboard extends React.Component {
  state = {
    showAnswered: false
  };

  render() {
    const { showAnswered } = this.state;
    const { answered, unanswered } = this.props;

    const list = showAnswered === true
      ? answered
      : unanswered;

    return (
      <div>
        <div className="dashboard-toggle">
          <button
            onClick={this.showUnanswered}
            style={{
              textDecoration: showAnswered === false ? "underline" : null
            }}
          >
            Unanswered
          </button>
          <span> | </span>
          <button
            onClick={this.showAnswered}
            style={{
              textDecoration: showAnswered === true ? "underline" : null
            }}
          >
            Answered
          </button>
        </div>
        <ul className="dashboard-list">
          {
            list.map(poll => (
              <li key={poll.id}>
                {poll.question}
              </li>
            ))
          }
        </ul>
      </div>
    );
  }

  showAnswered = () => {
    this.setState(() => ({
      showAnswered: true
    }));
  };

  showUnanswered = () => {
    this.setState(() => ({
      showAnswered: false
    }));
  };
}

let mapStateToProps = ({ authedUser, polls, users }) => {
  const answers = users[authedUser].answers;
  const answered = answers
    .map(id => polls[id])
    .sort((a, b) => b.timestamp - a.timestamp);

  const unanswered = Object.keys(polls)
    .filter(id => !answers.includes(id))
    .map(id => polls[id])
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    answered,
    unanswered,
  };
}

export default connect(mapStateToProps)(Dashboard);
