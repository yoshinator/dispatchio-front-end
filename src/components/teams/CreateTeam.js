import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Sidebar from '../Sidebar';
import withAuth from '../../hocs/withAuth';
import withRoleManager from '../../hocs/withRoleManager';
import { createTeamAction } from '../../actions/team'

class CreateTeam extends Component {
  state = {
    name: "",
    location_id: ""
  }

  componentDidMount() {
    this.setState({
      location_id: this.props.user.location.id
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createTeam(this.state) 
  }


  render() {

    if (this.props.creatingTeam) {
      return <Sidebar>
        <div >
          <h2 >
            Create New Team
                </h2>
          <div >
            <form onSubmit={this.handleSubmit}>
              <div >
                <label htmlFor="name">Team Name</label>
                <input onChange={this.handleChange} type="text" name="name" id="name" value={this.state.name} />
              </div>
              <button type="submit">Create</button>
            </form>
          </div>
        </div>
      </Sidebar>
    }
    else return <Redirect to="/teams"></Redirect>
  }
}

export const mapStateTopProps = ({ teamReducer: { team, creatingTeam }, loginReducer: { user } }) => {
  return {
    team,
    creatingTeam,
    user
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    createTeam: (body) => {
      dispatch(createTeamAction(body))
    }
  }

}
export default withRoleManager(withAuth(connect(mapStateTopProps, mapDispatchToProps)(CreateTeam))
);