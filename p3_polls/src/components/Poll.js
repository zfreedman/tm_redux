import { connect } from "react-redux";
import React from "react";

import { getPercentage } from "../utils/helpers";
import { handleAddAnswer } from "../actions/answers";

const getVoteKeys = () => ["aVotes", "bVotes", "cVotes", "dVotes"];

class Poll extends React.Component {
  render () {
    if (this.props.poll === null) {
      return <p>This poll does not exist</p>;
    }

    const { poll, vote, authorAvatar } = this.props;

    const totalVotes = getVoteKeys()
      .reduce((total, key) => total + poll[key].length, 0);

    return (
      <div className="poll-container">
        <h1 className="question">
          {poll.question}
        </h1>

        <div className="poll-author">
          By <img src={authorAvatar} alt="Author's Avatar" />
        </div>

        <ul>
          {
            ["a", "b", "c", "d"]
              .map(e => e + "Text")
              .map(key => {
                const count = poll[key[0] + "Votes"].length;

                return (
                  <li
                    className={`option ${vote === key[0] ? "chosen" : ""}`}
                    key={key}
                    onClick={
                      () => {
                        if (vote === null && !this.answered)
                        {
                          this.handleAnswer(key[0])
                        }
                      }
                    }
                  >
                    {
                      vote === null
                        ? poll[key]
                        : <div className="result">
                            <span>{poll[key]}</span>
                            <span>
                              {getPercentage(count, totalVotes)}% ({count})
                            </span>
                          </div>
                    }
                  </li>
                )
              })
          }
        </ul>
      </div>
    );
  }

  handleAnswer = answer => {
    this.answered = true;
    const { poll, authedUser } = this.props;
    this.props.dispatch(handleAddAnswer({
      answer,
      authedUser,
      id: poll.id,
    }));
  };
}

let mapStateToProps = ({ authedUser, polls, users }, { match }) => {
  const { id } = match.params;
  const poll = polls[id];

  if (poll === undefined) {
    return { poll: null };
  }

  const vote = getVoteKeys().reduce((vote, key) => {
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
