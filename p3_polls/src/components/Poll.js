import { connect } from "react-redux";
import React from "react";

class Poll extends React.Component {
  render () {
    return (
      <div className="poll-container">
        {
          JSON.stringify(this.props)
        }
      </div>
    );
  }
}

let mapStateToProps = ({ authedUser, polls, users }, { match }) => {
  const { id } = match.params;
  const poll = polls[id];

  if (poll === undefined) {
    return { poll: null };
  }

  const vote = ["aVotes", "bVotes", "cVotes", "dVotes"].reduce((vote, key) => {
    if (vote !== null) {
      return vote[0];
    }

    return poll[key].includes(authedUser)
      ? key
      : vote;
  }, null);

  return {
    authedUser,
    authorAvatar: users[poll.author].avatarURL,
    poll,
    vote,
  };
};

export default connect(mapStateToProps)(Poll);
