import { connect } from "react-redux";
import React from "react";

function Leaderboard ({ users }) {
  return (
    <div>
      {
        users.map(user => (
          <li className="user" key={user.id}>
            <img src={user.avatarURL} alt={`Avatar for ${user.name}`} />

            <div>
              <h1>{user.name}</h1>
              <p>{user.polls} Polls</p>
              <p>{user.answers} Answers</p>
            </div>
          </li>
        ))
      }
    </div>
  );
}

let mapStateToProps = ({ users }) => {
  return {
    users: Object.keys(users)
      .map(id => {
        const { answers, avatarURL, name, polls } = users[id];

        return {
          answers: answers.length,
          avatarURL,
          id,
          name,
          polls: polls.length,
        }
      })
      .sort((a, b) => b.polls + b.answers > a.polls + a.answers)
  };
};

export default connect(mapStateToProps)(Leaderboard);
