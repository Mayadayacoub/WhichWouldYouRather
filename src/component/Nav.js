import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  Menu,
  Responsive,
  Image,
  Grid,
  Button,
  Container,
  Segment,
  Icon,
  Label,
  Card,
} from "semantic-ui-react";
import { setAuthUser } from "../actions/authUser";

class Nav extends Component {
  handleLogout = (e) => {
    e.preventDefault();
    this.props.setAuthUser(null);
  };

  render() {
    const { authUser, users } = this.props;
    console.log(authUser);
    return (
      <Container>
        <Grid padded="vertically" columns={1}>
          <Grid.Row>
            <Menu.Item>
              <span>
                <Image
                  src={users[authUser].avatarURL}
                  avatar
                  spaced="right"
                  verticalAlign="bottom"
                />
                {users[authUser].name}
              </span>
            </Menu.Item>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Button
                content="Logout"
                labelPosition="right"
                basic
                compact
                icon="log out"
                size="mini"
                floated="right"
                onClick={this.handleLogout}
              />

              <Menu pointing secondary>
                <Menu.Item name="home" as={NavLink} to="/" exact />
                <Menu.Item name="new poll" as={NavLink} to="/add" />
                <Menu.Item name="leader board" as={NavLink} to="/leaderboard" />
              </Menu>
            </Grid.Column>
          </Grid.Row>
          <Segment>
            <Card>
              <Image
                as="a"
                rounded
                wrapped
                ui={false}
                src={users[authUser].avatarURL}
              />
              <Card.Content>
                <Card.Header>{users[authUser].name}</Card.Header>
                <Card.Meta>
                  <span className="date">Joined in 2015</span>
                </Card.Meta>
              </Card.Content>
            </Card>{" "}
          </Segment>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps({ users, authUser }) {
  return {
    authUser,
    users,
  };
}

export default connect(mapStateToProps, { setAuthUser })(Nav);
