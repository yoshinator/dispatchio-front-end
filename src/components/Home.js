import React, { Component } from 'react';
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth'

import Employee from './employee/Employee'
import Sidebar from './Sidebar'
import Manager from './manager/Manager';
import Owner from './owner/Owner';

class Home extends Component {
  render() {
    if(!this.props.user.user){
      return <h1>1</h1>
    }
    if(this.props.user.user.user_type === "employee" ){
      return <Employee />
    }
    if(this.props.user.user.user_type === "manager"){
      return (
      <>
          <Manager />
      </>
      )
    }
    if(this.props.user.user.user_type === "owner"){
      return (
        <>
          <Owner />
        </>
      )
    }
    else{
      return <div>
              <h1>Other</h1>
      </div>
    }
  }
}

const mapStateToProps = ( loginReducer ) => ({
  user: loginReducer.loginReducer
})



function mapDispatchToProps(dispatch) {
  return {
    //
  }
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Home));