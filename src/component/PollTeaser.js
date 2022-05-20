import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { Header, Button } from "semantic-ui-react";

export class PollTeaser extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    unanswered: PropTypes.bool.isRequired,
  };
  state = {
    viewThePoll: false,
  };
  handleClick = (e) => {
    this.setState((previousState) => ({
      viewThePoll: !previousState.viewThePoll,
    }));
  };
  render() {
    const { question, unanswered } = this.props;
    const { viewThePoll } = this.state;

    const buttonContent =
      unanswered === true ? "Answer The Poll" : "The Results";

    if (viewThePoll === true) {
      return <Redirect push to={`/questions/${question.id}`} />;
    }
    return (
      <Fragment>
        <Header as="h5" textAlign="left">
          Would you rather
        </Header>
        <p style={{ textAlign: "center" }}>
          {question.optionOne.text}
          <br />
          or...
        </p>
        <Button
          style={{ backgroundColor: "#EDE0D6" }}
          size="tiny"
          fluid
          onClick={this.handleClick}
          content={buttonContent}
        />
      </Fragment>
    );
  }
}

export default PollTeaser;
