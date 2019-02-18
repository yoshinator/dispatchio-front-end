
import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

class JoinCompany extends Component {

  componentDidMount(){
    console.log("Hello")
  }

  render() {

    if (this.props.user === null || this.props.user.location.id !== 1) {
      return <Redirect to="/"></Redirect>
    } else

      return (
        <div>
          <h1>In Join Company</h1>
        </div>
      )
  }
}


const mapsStateToProps = ({loginReducer: {user}}) => {
  return {
    user
  }
}

export default connect(mapsStateToProps)(JoinCompany)
