import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import {
  Button,
  Dimmer,
  Dropdown,
  Form,
  FormInput,
  Grid,
  Header,
  Icon,
  Image,
  Loader,
  Message,
  Segment,
} from "semantic-ui-react";
import { setAuthUser } from "../actions/authUser";
import { styles } from "../utils/style";
class Login extends React.Component {
  state = {
    loading: false,
  };
  handleLoading = () => {
    this.setState({ loading: true });
  };
  render() {
    return (
      <Fragment>
        <Segment.Group>
          <LoginHeader />
          <LoginLayout
            image={<BrandImage />}
            form={<ConnectedLoginForm onLoading={this.handleLoading} />}
            loading={this.state.loading}
          />
        </Segment.Group>
      </Fragment>
    );
  }
}

const LoginHeader = () => (
  <Header as="h4" block attached="top" textAlign="center">
    <Header.Content>Welcome to the Would You Rather App!</Header.Content>
    <Header.Subheader>Please sign in to continue</Header.Subheader>
  </Header>
);

const LoginLayout = ({ image, form, loading }) => (
  <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>
      {loading === true && (
        <Dimmer active inverted>
          <Loader inverted content="Loading..." />
        </Dimmer>
      )}
      {image}
      <br />
      {form}
    </Grid.Column>
  </Grid>
);
class LoginForm extends Component {
  state = {
    value: "",
  };
  onChange = (e, { value }) => {
    this.setState({ value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { onLoading, setAuthUser } = this.props;
    const authUser = this.state.value;

    new Promise((res, rej) => {
      onLoading();
      setTimeout(() => res(), 500);
    }).then(() => setAuthUser(authUser));
  };
  getData = () => {
    const { users } = this.props;

    return users.map((user) => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: { avatar: true, src: user.avatarURL },
    }));
  };
  render() {
    const { value } = this.state;
    const disabled = value === "" ? true : false;
    return (
      <Form size="large" onSubmit={this.handleSubmit}>
        <Segment stacked>
          <FormInput>
            <Dropdown
              placeholder="Select Friend"
              fluid
              selection
              options={this.getData()}
              value={value}
              onChange={this.onChange}
            />
          </FormInput>
          <Button
            disabled={disabled}
            style={{ backgroundColor: "#e5a279", color: "#AE8B70" }}
            fluid
            size="large"
          >
            Login
          </Button>
        </Segment>
        <footer className="footer">
          {" "}
          <Icon disabled name="copyright outline" />
        </footer>
      </Form>
    );
  }
}

const BrandImage = () => (
  <Image
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMww0GVOuVBhHGh3ty-6eJ6aZlnWIaoepoIA&usqp=CAU"
    size="small"
    centered
  />
);

const ConnectedLoginForm = connect(mapStateToProps, { setAuthUser })(LoginForm);

function mapStateToProps({ users }) {
  return {
    users: Object.values(users),
  };
}

export default Login;
