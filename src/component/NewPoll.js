import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Segment,
  Header,
  Grid,
  Divider,
  Form,
  Dimmer,
  Loader,
  Button,
  Icon,
} from "semantic-ui-react";
import { handleSaveQuestion } from "../actions/questions";

export class NewPoll extends Component {
  static propTypes = {
    authUser: PropTypes.string.isRequired,
    handleSaveQuestion: PropTypes.func.isRequired,
  };
  state = {
    validateSubmit: false,
    isLoading: false,
    option1: "",
    option2: "",
  };
  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  handleSubmit = (eve) => {
    eve.preventDefault();
    const { authUser, handleSaveQuestion } = this.props;
    const { option1, option2 } = this.state;

    new Promise((res, rej) => {
      this.setState({ isLoading: true });
      handleSaveQuestion(option1, option2, authUser);
      setTimeout(() => res("success"), 500);
    }).then(() => {
      this.setState({
        option1: "",
        option2: "",
      });
      this.setState({ validateSubmit: true });
    });
  };
  render() {
    const disabled = this.state.option1 === "" || this.state.option2 === "";
    const { validateSubmit } = this.state;
    if (validateSubmit === true) {
      return <Redirect to="/" />;
    }
    return (
      <Segment.Group>
        <Header as="h3" textAlign="left" block attached="top">
          Create A New Poll
        </Header>
        <Grid padded>
          <Grid.Column>
            {this.state.isLoading && (
              <Dimmer active inverted>
                <Loader content="Updating" />
              </Dimmer>
            )}
            <p>Complete The Question:</p>
            <p>
              <strong>Would you Rather...</strong>
            </p>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                id="option1"
                placeholder="Enter Option (1)..."
                value={this.state.option1}
                onChange={this.handleChange}
                required
              />
              <Divider horizontal>Or</Divider>
              <Form.Input
                id="option2"
                placeholder="Enter Option (2)..."
                value={this.state.option2}
                onChange={this.handleChange}
                required
              />
              {/* <Button positive size="tiny" fluid disabled={disabled}>
                Submit
              </Button> */}
              <Button
                animated="vertical"
                fluid
                disabled={disabled}
                style={{ backgroundColor: "#BC7B6A" }}
              >
                <Button.Content visible>Submit</Button.Content>
                <Button.Content hidden>
                  <Icon name="sync alternate" />
                </Button.Content>
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment.Group>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}

export default connect(mapStateToProps, { handleSaveQuestion })(NewPoll);
