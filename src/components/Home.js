import React from 'react';
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

function Home (props) {

  props.addWeek(timeHelper.getWeek(), props.user.location.id)
  props.getCustomers(props.user.location.id)
  props.getTeams(props.user.location.id)
  props.getTeamMembers(props.user.location.id)

  console.log(props.user)

  switch(props.user.user_type){
    case "employee":
      return <Employee />;
    case "manager":
      return <Manager />;
    case "owner":
      return <Owner />;
      default:
        return <div></div>
  }

}

const mapStateToProps = ( {loginReducer: {user}} ) => ({
   user
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
