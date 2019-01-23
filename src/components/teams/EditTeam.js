import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Sidebar from '../Sidebar';
import withAuth from '../../hocs/withAuth';
import withRoleManager from '../../hocs/withRoleManager';
import { updateTeamAction } from '../../actions/team'

class EditTeam extends Component {
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
    this.props.editTeam(this.state)
  }
  render() {

    if (this.props.editingTeam) {
      return <Sidebar>
        <div className="card inner-card">
          <h2 className="customer-title">
            Create New Team
                </h2>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Team Name</label>
                <input onChange={this.handleChange} type="text" className="form-control" name="name" id="name" value={this.state.name} />
              </div>
              <button type="submit" class="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </Sidebar>
    }
    else return <Redirect to="/teams"></Redirect>
  }
}

export const mapStateTopProps = ({ teamReducer: { team, creatingTeam, editingTeam }, loginReducer: { user } }) => {
  return {
    team,
    creatingTeam,
    editingTeam,
    user
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    updateTeam: (body) => {
      dispatch(updateTeamAction(body))
    }
  }

}
export default withRoleManager(withAuth(connect(mapStateTopProps, mapDispatchToProps)(EditTeam))
);