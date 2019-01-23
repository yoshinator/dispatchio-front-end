import React, { Component } from 'react';
import { connect } from 'react-redux';
import withAuth from '../hocs/withAuth'

import Employee from './employee/Employee'
import Manager from './manager/Manager';
import Owner from './owner/Owner';
import YOANHelpers from '../helpers/helpers';
import { addWeekAction } from '../actions/job'
import { getCustomersAction } from '../actions/customer';
import { getTeamsAction, getTeamMembersAction } from '../actions/team'

const timeHelper = new YOANHelpers ();

class Home extends Component {

  componentDidMount(){
    if (this.props.user.user.user_type === "employee" || this.props.user.user.user_type === "owner") {
      this.props.addWeek(timeHelper.getWeek(), this.props.user.user.location.id)
      this.props.getCustomers(this.props.user.user.location.id)
      this.props.getTeams(this.props.user.user.location.id)
      this.props.getTeamMembers(this.props.user.user.location.id)
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
    }, 
    getCustomers: (locationId) => {
      dispatch(getCustomersAction(locationId))
    },
    getTeams: (locationId) => {
      dispatch(getTeamsAction(locationId))
    },
    getTeamMembers: (locationId) => {
      dispatch(getTeamMembersAction(locationId));
    }
  }
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Home));