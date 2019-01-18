import React, { Component } from 'react';
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth'
import { withRouter} from 'react-router-dom'

import {addWeekAction} from '../actions/job'
import Employee from './employee/Employee'
import Manager from './manager/Manager';
import Owner from './owner/Owner';
import YOANHelpers from '../helpers/helpers';

const timeHelper = new YOANHelpers ();

class Home extends Component {

  componentDidMount(){
    if (this.props.user.user.user_type === "employee" || this.props.user.user.user_type === "owner") {
      this.props.addWeek(timeHelper.getWeek(), this.props.user.user.location.id)
    }
  }

  render() {
    if(!this.props.user.user){
      return <h1> </h1>
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
    addWeek: (week, location_id) => {
      dispatch(addWeekAction(week, location_id))
    }
  }
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Home));