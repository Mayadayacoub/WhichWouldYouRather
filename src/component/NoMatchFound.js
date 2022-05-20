import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Container, Header, Icon, Menu } from "semantic-ui-react";

export class NoPageFound extends Component {
  render() {
    return (
      <Container textAlign="center">
        <Header as="h3">No Match Found404 Error</Header>
        <Icon.Group size="big">
          <Icon loading size="big" name="dont" />
          <Icon name="user" />
        </Icon.Group>{" "}
        <h2>
          Nothing to see here. <br />
          Please use the Home menu <br />
          <Menu.Item
            name="home"
            className="notFounf"
            as={NavLink}
            to="/"
            exact
          />{" "}
          <br />
          to try again.
        </h2>
      </Container>
    );
  }
}

export default NoPageFound;
