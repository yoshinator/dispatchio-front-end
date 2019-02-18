import React from 'react'
import JobsSearch from './JobsSearch'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

function Employee({user}) {
  if(user.location.id === 1){
    return <Redirect to="/joincompany"></Redirect>
  }else {
    return  <JobsSearch />
  }
}


const mapsStateToProps = ({loginReducer: {user}})=> {
  return {
    user
  }
}

export default connect(mapsStateToProps)(Employee)