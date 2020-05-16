import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router'

import { updateJobAction } from '../../actions/job';
import { getTeamsAction } from '../../actions/team';
import withAuth from '../../hocs/withAuth';
import withRoleManager from '../../hocs/withRoleManager';
import YOANHelpers from '../../helpers/helpers';
import './Job.css'
const timeHelper = new YOANHelpers();


class Job extends Component {
  state = {
    street_1: "",
    street_2: "",
    city: "",
    zip: "",
    description: "",
    status: "",
    payment_type: "",
    paid: "",
    schedule_time: "",
    location_id: "",
    date: ""
  };

  componentDidMount(){
    //Gets the teams for the current location
    this.props.getTeams(this.props.job.editingJob.location.id);
    
    this.setState({
      date: timeHelper.dateTransform(this.props.job.editingJob.schedule_date)
    });
    this.setState({
      ...this.state,
      ...this.props.job.editingJob
    });
  } 

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleDateChange = event => {
    const dateArray = event.target.value.split("-");
    const year = dateArray[0];
    const month = parseInt(dateArray[1]) - 1;
    const date = dateArray[2];
    const _entryDate = new Date(year, month, date);
    this.setState({
      schedule_date: _entryDate.toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric"
      })
    });
    this.setState({
      date: event.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const body = {
      street_1: this.state.street_1,
      street_2: this.state.street_2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      description: this.state.description,
      status: this.state.status,
      payment_type: this.state.payment_type,
      schedule_date: this.state.schedule_date,
      schedule_time: this.state.schedule_time,
      paid: this.state.paid,
      team_id: this.state.team_id
    };
    this.props.updateJob(body, this.state.id);
  };

  handleTimeChange = (event) => {
    console.log("%cHANDLETIME", 'color:green', event.target.name, event.target.value);
  }

  //PART OF FORM BUILDER RENDER RETURN
  selectionOptionStatus = () => {
    switch (this.state.status) {
      case "IR in route":
        return (
          <>
            <option selected="selected">IR in route</option>
            <option>IP in progress</option>
            <option>DN done</option>
            <option>FU follow up</option>
          </>
        );
      case "IP in progress":
        return (
          <>
            <option>IR in route</option>
            <option selected="selected">IP in progress</option>
            <option>DN done</option>
            <option>FU follow up</option>
          </>
        );
      case "DN done":
        return (
          <>
            <option>IR in route</option>
            <option>IP in progress</option>
            <option selected="selected">DN done</option>
            <option>FU follow up</option>
          </>
        );
      case "FU follow up":
        return (
          <>
            <option>IR in route</option>
            <option>IP in progress</option>
            <option>DN done</option>
            <option selected="selected">FU follow up</option>
          </>
        );
      default:
        return (
          <>
            <option>IR in route</option> <option>IP in progress</option>{" "}
            <option>DN done</option> <option>FU follow up</option>
          </>
        );
    }
  };

  selectionOptionTeam = () => {
   return this.props.teams.map(team => {
     if (team.id === this.state.team.id){
       return <option value={team.id} selected = "selected" >{team.name}</option>
     }
       else {
         return <option value={team.id}>{team.name}</option>

       }
    })
  }

  // PART OF FORM BUILDER IN RENDER RETURN
  selectionOptionPayment = () => {
    switch (this.state.payment_type) {
      case "CC Credit Card":
        return (
          <>
            <option selected="selected">CC Credit Card</option>
            <option>CH Cash</option>
            <option>CK Check</option>
            <option>INV Invoice</option>
          </>
        );
      case "CH Cash":
        return (
          <>
            <option>CC Credit Card</option>
            <option selected="selected">CH Cash</option>
            <option>CK Check</option>
            <option>INV Invoice</option>
          </>
        );
      case "CK Check":
        return (
          <>
            <option>CC Credit Card</option>
            <option>CH Cash</option>
            <option selected="selected">CK Check</option>
            <option>INV Invoice</option>
          </>
        );
      case "INV Invoice":
        return (
          <>
            <option>CC Credit Card</option>
            <option>CH Cash</option>
            <option selected="selected">CK Check</option>
            <option>INV Invoice</option>
          </>
        );
      default:
        return (
          <>
            <option selected="selected">CC Credit Card</option>
            <option>CH Cash</option>
            <option>CK Check</option>
            <option>INV Invoice</option>
          </>
        );
    }
  };

  paidRadioButtons = () => {
    if (this.state.paid === true || this.state.paid === "true") {
      return (
        <>
          {this.props.job.editingJob.paid ? (
            <div>This bill currently paid choose no to mark unpaid</div>
          ) : (
            <div />
          )}
          <div>
            <input
              onClick={this.handleChange}
              type="radio"
              name="paid"
              id="paid1"
              value="true"
              checked
            />
            <label htmlFor="paid1">
              Yes
            </label>
          </div>
          <div>
            <input
              onClick={this.handleChange}
              type="radio"
              name="paid"
              id="paid2"
              value="false"
            />
            <label htmlFor="paid2">
              No
            </label>
          </div>
        </>
      );
    } else {
      return (
        <>
          {this.props.job.editingJob.paid ? (
            <div>This bill currently paid choose 'No' to mark unpaid</div>
          ) : (
            <div />
          )}
          <div>
            <input
              onChange={this.handleChange}
              type="radio"
              name="paid"
              id="paid1"
              value="true"
              checked
            />
            <div></div>
            <label htmlFor="paid1">
              Yes
            </label>
          </div>
          <div>
            <input
              onChange={this.handleChange}
              type="radio"
              name="paid"
              id="paid2"
              value="false"
              checked
            />
            <div></div>
            <label htmlFor="paid2">
              No
            </label>
          </div>
        </>
      );
    }
  };

  render() {
    if (this.state.city || this.state.street_1){
    return(
      <div className="container">
        <div className="form-container">
          <h2>
            {this.props.job.editingJob.city}, {this.props.job.editingJob.customer.name} {this.props.job.editingJob.customer.phone}, {this.props.job.editingJob.status}
          </h2>
          <div className="form">
            <form onSubmit={this.handleSubmit} autoComplete="one">
              
                <label htmlFor="street_1">Street 1</label>
                <input onChange={this.handleChange} type="text" name="street_1" id="street_1" value={this.state.street_1} />
              
                <label htmlFor="street_2">Street 2</label>
                <input onChange={this.handleChange} type="text" name="street_2" id="street_2" value={this.state.street_2} />
              
                <label htmlFor="city">City</label>
                <input onChange={this.handleChange} type="text" name="city" id="city" value={this.state.city} />
              
                <label htmlFor="state">State</label>
                <input onChange={this.handleChange} type="text" name="state" id="state" value={this.state.state} />
              
                <label htmlFor="zip">Zip</label>
                <input onChange={this.handleChange} type="text" name="zip" id="zip" value={this.state.zip} />
              
                <label
                  htmlFor={`add-to-description${
                    this.props.job.editingJob.id
                  }`}
                >
                  Description
                </label>
                <textarea onChange={this.handleChange} name="description" id={`add-to-description${this.props.job.id}`} rows="3" value={this.state.description} />

              <div>
                Date: {this.state.schedule_date}
                <label htmlFor="date" />
                <input onChange={this.handleDateChange} id="date" value={this.state.date} type="date" name="date" min="" max="" />
              </div>
              <div>
                Scheduled time: {timeHelper.formatTime(this.state.schedule_time)}
                <label htmlFor="time" />
                <input onChange={this.handleChange} id="time" value={this.state.schedule_time} type="time" name="schedule_time" min="" max="" />
              </div>

              <div>
                <label htmlFor="jobStatusSelect">Change Status</label>
                <select onChange={this.handleChange} name="status" id={`jobStatusSelect${this.props.job.editingJob.id}`} value={this.state.status}>
                  {this.selectionOptionStatus()}
                </select>
              </div>

              <div>
                <label htmlFor="jobPaymentSelect">
                  Change Payment Type
                </label>
                <select onChange={this.handleChange} name="payment_type" id={`jobPaymentSelect${this.props.job.editingJob.id}`} value={this.state.payment_type}>
                  {this.selectionOptionPayment()}
                </select>
              </div>

              <div>
                <label htmlFor="jobPaymentSelect">
                  Change team
                </label>
                <select onChange={this.handleChange} name="team_id" id={`teamSelect${this.props.job.editingJob.id}`} >
                  {this.selectionOptionTeam()}
                </select>
              </div>

              <div className="paid">
                <label htmlFor="paid">Paid? </label>
                {this.paidRadioButtons()}
              </div>

              <button className="button" type="submit">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
      )
    }
    else return <Redirect to="/"></Redirect>
  }
}

const mapDispatchToProps =(dispatch) =>{
 return {
   updateJob: (body, jobId) => {
     dispatch(updateJobAction(body, jobId))
    },
   getTeams: (location_id) => {
     dispatch(getTeamsAction(location_id));
   }
  }
}

const mapStateToProps = (state) => {
  return {
    job: state.jobReducer,
    teams: state.teamReducer.teams
  }
}
 
export default withRoleManager(withAuth(connect(mapStateToProps, mapDispatchToProps)(Job)))


