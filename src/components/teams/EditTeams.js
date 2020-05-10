import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTeamAction } from '../../actions/team';
import Sidebar from '../Sidebar';
import { Redirect } from 'react-router-dom';


class EditTeam extends Component {
  state = {
    name: "",
    location_id: ""
  }

  componentDidMount() {
    this.setState({
      ...this.props.team
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.updateTeam(this.state, this.state.id)
  }
  render() {
    if (this.props.editingTeam) {
      return <Sidebar>
        <div>
          <h2>TEAM INFO</h2>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="name">Name</label>
                <input onChange={this.handleChange} type="text" name="f_name" id="name" value={this.state.name} />
              </div>

              <div>
                <label htmlFor="phone">Phone</label>
                <input onChange={this.handleChange} type="phone" name="phone" id="phone" value={this.state.phone} />
              </div>

              <div>
                <label htmlFor="teamMemberType">Team Member Type</label>
                <select onChange={this.handleChange}  name="state" id="state">
                  <option value="" selected></option>
                  {this.getEmployees}
                </select>
              </div>

              <button type="submit">
                Update
                </button>
            </form>
          </div>
        </div>
      </Sidebar>;
    }
    else return <Redirect to="/teams"></Redirect>
  }
}



const mapStateToProps = ({ teamReducer: team, editingTeam }) => {
  return {
    team, 
    editingTeam
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateTeam: (team, id) => {
      dispatch(updateTeamAction(team, id))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTeam)
