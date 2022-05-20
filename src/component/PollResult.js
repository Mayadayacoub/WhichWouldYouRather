import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Header,
  Segment,
  Progress,
  Label,
  Button,
  Icon,
} from "semantic-ui-react";
import { styles } from "../utils/style";

const YourVoteLabelMark = () => (
  <Label color="teal" ribbon="right" className="vote">
    <Icon name="check circle outline" loading size="big" className="compact" />
    <div style={{ float: "right" }}>
      Your
      <br />
      Vote{" "}
    </div>
  </Label>
);

export class PollResult extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    question: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };
  handleClick = () => {
    this.props.history.push("/");
  };

  render() {
    const { question, user } = this.props;
    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const votesTotalNumber = optionOneVotes + optionTwoVotes;
    const userVote = user.answers[question.id];

    let optionOne = styles.secondary,
      optionTwo = styles.secondary;
    if (optionOneVotes > optionTwoVotes) {
      optionOne = styles.primary;
    } else if (optionTwoVotes > optionOneVotes) {
      optionTwo = styles.primary;
    }

    return (
      <Fragment>
        <Header as="h1">
          Results:
          <Header.Subheader style={{ fontWeight: "bold" }}>
            Would You Rather
          </Header.Subheader>
        </Header>
        <Segment
          color={optionOne.color}
          style={{ backgroundColor: `${optionOne.bgColor}` }}
        >
          {userVote === "optionOne" && <YourVoteLabelMark />}
          <p style={{ fontWeight: "bold" }}>{question.optionOne.text}</p>
          <Progress
            percent={((optionOneVotes / votesTotalNumber) * 100).toFixed(2)}
            progress
            color={optionOne.color}
          >
            {optionOneVotes} out of {votesTotalNumber} votes
          </Progress>
        </Segment>
        <Segment
          color={optionTwo.color}
          style={{ backgroundColor: `${optionTwo.bgColor}` }}
        >
          {userVote === "optionTwo" && <YourVoteLabelMark />}

          <p style={{ fontWeight: "bold" }}>{question.optionTwo.text}</p>
          <Progress
            percent={((optionTwoVotes / votesTotalNumber) * 100).toFixed(2)}
            progress
            color={optionTwo.color}
          >
            {optionTwoVotes} out of {votesTotalNumber} votes
          </Progress>
        </Segment>
        {/* <Form.Field> */}
        <Button
          size="tiny"
          style={{ backgroundColor: "#f1baa7" }}
          floated="right"
          onClick={this.handleClick}
        >
          Back
        </Button>
        {/* </Form.Field> */}
      </Fragment>
    );
  }
}

function mapStateToProps({ users, authUser }) {
  const user = users[authUser];
  return {
    user,
  };
}

export default withRouter(connect(mapStateToProps)(PollResult));
