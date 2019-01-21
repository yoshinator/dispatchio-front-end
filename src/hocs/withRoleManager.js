import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

const withRoleManager = WrappedComponent => {
  class AuthorizedComponent extends React.Component {

    render() {
      if (this.props.user) {
        if (this.props.user.user_type === "manager" || this.props.user.user_type === "owner") {
   
          return <WrappedComponent />;
        }
        } else {
          //user is not AUTHORIZED to see this component
          return <Redirect to="/" />;
        }
    }
  }

  const mapStateToProps = state => {
    return {
      user: state.loginReducer.user
    };
  };

  return connect(mapStateToProps)(AuthorizedComponent);
};

export default withRoleManager;
