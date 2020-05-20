import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { fetchCurrentUser } from "../actions/user";

const withAuth = WrappedComponent => {
  class AuthorizedComponent extends React.Component {
    componentDidMount() {
      // POTENTIAL SECURITY FLAW!!! my tokens don't expire
      if (localStorage.getItem("jwt") && !this.props.loggedIn)
        this.props.fetchCurrentUser();
      // if i have a token but don't know who it belongs to, ask the server for that user's data
    }

    render() {
      if (localStorage.getItem("jwt") && this.props.loggedIn) {
        //i have a token and i'm logged in
        // wrapped component in our case is Profile
        return <WrappedComponent />;
      } else if (
        localStorage.getItem("jwt") &&
        (this.props.authenticatingUser)
        // (this.props.authenticatingUser || !this.props.loggedIn)
      ) {
        //we're currently fetching, show a loading spinner
        return <div role="status">
          <span>Loading...</span>
        </div>
      } else {
        //user is not AUTHORIZED to see this component
        return <Redirect to="/login" />;
      }
    }
  }

  const mapStateToProps = state => {

    return (
      {
      loggedIn: state.loginReducer.loggedIn,
      authenticatingUser: state.loginReducer.authenticatingUser
      }
    )
  };

  const mapDispatchToProps = { fetchCurrentUser: fetchCurrentUser };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuthorizedComponent);
};

export default withAuth;
