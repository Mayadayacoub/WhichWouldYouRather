import React, { Component, Fragment } from "react";
import Home from "./component/Home";
import { handleInitialData } from "../src/actions/shared";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./component/Login";
import Nav from "./component/Nav";
import { Grid } from "semantic-ui-react";
import Leaderboard from "./component/LeaderBoard";
import NewPoll from "./component/NewPoll";
import NoPageFound from "./component/NoMatchFound";
import UserCard from "./component/UserCard";
import ScrollTop from "./component/ScrollTop";
class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { authUser } = this.props;

    return (
      <Router>
        <div className="App">
          {authUser === null ? (
            <Route
              render={() => (
                <ContentGrid>
                  <Login />
                </ContentGrid>
              )}
            />
          ) : (
            <Fragment>
              <Nav />

              <ContentGrid>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route path="/questions/bad_id" component={NoPageFound} />
                  <Route path="/questions/:question_id" component={UserCard} />
                  <Route path="/add" component={NewPoll} />
                </Switch>
              </ContentGrid>
            </Fragment>
          )}
        </div>
      </Router>
    );
  }
}
const ContentGrid = ({ children }) => (
  <Grid padded="vertically" columns={1} centered>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 550 }}>{children}</Grid.Column>
    </Grid.Row>
  </Grid>
);

function mapStateToProps({ authUser }) {
  return {
    authUser,
  };
}
export default connect(mapStateToProps, { handleInitialData })(App);
