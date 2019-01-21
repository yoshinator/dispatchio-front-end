import React, { Component } from 'react';
import {connect } from 'react-redux';
import withAuth from '../../hocs/withAuth';
import withRoleManager from '../../hocs/withRoleManager'

class CreateCustomer extends Component {
  render() {
    return (
      <div>
        in create customer
      </div>
    )
  }
}

export const mapStateTopProps = () => {

}

export const mapDispatchToProps = (dispatch) => {

}
export default withRoleManager(withAuth(connect(mapStateTopProps,mapDispatchToProps)(CreateCustomer))
);