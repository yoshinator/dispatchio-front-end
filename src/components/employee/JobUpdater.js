import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getEmployeeJobsAction } from '../../actions/job'
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
                       const crd = pos.coords;
                       console.log("Your current position is:");
                       console.log(`Latitude : ${crd.latitude}`);
                       console.log(`Longitude: ${crd.longitude}`);
                       console.log(`More or less ${crd.accuracy} meters.`);
                       const time = this.getCurrentFormattedTime();
                       const delimiter = "\n-------------------\n";
                       // Builds the body with status as the current status and description as the previous description plus the description that is being added with a time stamp and employee name.
                       const body = { status: this.state.status, description: this.props.job.description + delimiter + " \nUpdated at: " + time + " \n " + "By: " + this.props.user.f_name + " " + this.props.user.l_name + this.state.description + delimiter };
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

  //UPDATE HERE ALSO INCASE OF NAVIGATOR ISSUE
  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }


  handleSubmit = (e) => {
    e.preventDefault()
    navigator.geolocation.getCurrentPosition(this.success, this.error);
    console.log(this.state)
  }
  render() {
    console.log(this.props)
    return <div className="card inner-card">
        <div className="card-body">
          <form onSubmit={this.handleSubmit} autoComplete="one">
            <div className="form-group">
              <label htmlFor="jobStatusSelect">Change Status</label>
              <select onChange={this.handleChange}className="form-control" name="status" id={`jobStatusSelect${this.props.job.id}`}>
                <option>IR in route</option>
                <option>IP in progress</option>
                <option>DN done</option>
                <option>FU follow up</option>
              </select>
            </div>
            <div className="form-group">
            <label htmlFor={`add-to-description${this.props.job.id}`}>Add to description</label>
            <textarea onChange={this.handleChange} name="description" className="form-control" id={`add-to-description${this.props.job.id}`} rows="2" />
            </div>
            <button type="submit" className="btn btn-primary">
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobUpdater)