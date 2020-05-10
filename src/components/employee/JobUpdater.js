import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getEmployeeJobsAction } from '../../actions/job'
import { updateUserAction } from '../../actions/user'
import JSONAPIAdapter from '../../adapters/ApiAdapter'
const JOBAdapter = new JSONAPIAdapter("api/v1/jobs")

class JobUpdater extends Component {
  state ={
    status: "IR in route",
    description: ""
    }

  handleChange =(event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  getCurrentFormattedTime=()=>{
    return new Date().toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: "true"
    })
  }

  //THIS IS WHERE WE NEED UPDATE THE DB
  success = (pos) => {
    const time = this.getCurrentFormattedTime();
    
    //methods available on crd: crd.latitude, crd.longtitude, crd.accuracy check console for others.
    const crd = pos.coords;

    const userBody = {
      lat: crd.latitude,
      lon: crd.longitude,
      upat: time
    }

    this.props.updateUser(userBody, this.props.user.id)

    const delimiter = "\n-------------------\n";

    // Builds the body with status as the current status and description as the previous description plus the description that is being added with a time stamp and employee name.
    const body = { status: this.state.status, description: this.props.job.description + delimiter + " \nUpdated at: " + time + " \n  By: " + this.props.user.f_name + " " + this.props.user.l_name + this.state.description + delimiter };

    // What the hell is doing here rookie! Put it where it belongs.
    JOBAdapter.updateItem(body, this.props.job.id)
    .then(response => {if(response.ok)
    {
      this.props.getJobs(this.props.job.schedule_date, this.props.user.id)
    }
    else{
      console.error(response.error)
    }
  })
  }

  //UPDATE HERE ALSO INCASE OF NAVIGATOR ISSUE <-- UPDATE? you mean DISPATCH
  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }


  handleSubmit = (e) => {
    e.preventDefault()
    navigator.geolocation.getCurrentPosition(this.success, this.error);
  }
  render() {
    console.log(this.props)
    return <div>
        <div>
          <form onSubmit={this.handleSubmit} autoComplete="one">
            <div>
              <label htmlFor="jobStatusSelect">Change Status</label>
              <select onChange={this.handleChange} name="status" id={`jobStatusSelect${this.props.job.id}`}>
                <option>IR in route</option>
                <option>IP in progress</option>
                <option>DN done</option>
                <option>FU follow up</option>
              </select>
            </div>
            <div>
            <label htmlFor={`add-to-description${this.props.job.id}`}>Add to description</label>
            <textarea onChange={this.handleChange} name="description" id={`add-to-description${this.props.job.id}`} rows="2" />
            </div>
            <button type="submit">
              Update
            </button>
          </form>
        </div>
      </div>;
  }
}

const mapStateToProps = (state) => ({
  user: state.loginReducer.user
})

const mapDispatchToProps = (dispatch) => {
  return {
    getJobs: (day, user_id) => {
      dispatch(getEmployeeJobsAction(day, user_id))
    },
    updateUser: (body, user_id) => {
      dispatch(updateUserAction(body, user_id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobUpdater)