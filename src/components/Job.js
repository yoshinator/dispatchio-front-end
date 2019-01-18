import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './job.css'

import { updateJobAction } from '../actions/job';
import YOANHelpers from '../helpers/helpers';
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
    date: timeHelper.dateTransform(this.props.job.editingJob.schedule_date)
  };

  handleChange = event => {
    console.log("INININ HANDLE CHANGE!!!!!", event.target.name, event.target.value)
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
    })
    this.setState({
      date: event.target.value
    })
      ;
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.payment_type);
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
      paid: this.state.paid

    };
    this.props.updateJob(body, this.state.id, this.props.changeView);
    this.props.history.push("/jobs");
  };

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

  paidRadioButtons =() => {
    if (this.state.paid === true || this.state.paid ==="true") {
      return <>
          {this.props.job.editingJob.paid ? <div>This bill currently paid choose no to mark unpaid</div> : <div></div>}
          <div className="form-check">
            <input onClick={this.handleChange} className="form-check-input" type="radio" name="paid" id="paid1" value="true" checked />
            <label className="form-check-label" htmlFor="paid1">
              Yes
            </label>
          </div>
          <div className="form-check">
            <input onClick={this.handleChange} className="form-check-input" type="radio" name="paid" id="paid2" value="false" />
            <label className="form-check-label" htmlFor="paid2">
              No
            </label>
          </div>
        </>;
    } else {
      return <>
        {this.props.job.editingJob.paid ? <div>This bill currently paid choose 'No' to mark unpaid</div> : <div></div>}
          <div className="form-check">
            <input onClick={this.handleChange} className="form-check-input" type="radio" name="paid" id="paid1" value="true" />
            <label className="form-check-label" htmlFor="paid1">
              Yes
            </label>
          </div>
          <div className="form-check">
            <input onClick={this.handleChange} className="form-check-input" type="radio" name="paid" id="paid2" value="false" checked />
            <label className="form-check-label" htmlFor="paid2">
              No
            </label>
          </div>
        </>;
    }
  }


  componentDidMount() {
    this.setState({
      ...this.state,
      ...this.props.job.editingJob
    });
  }

  render() {
    return (
      <>
        <div className="card inner-card">
          <h2 className="job-edit-title">
            {this.props.job.editingJob.city},{" "}
            {this.props.job.editingJob.customer.name}{" "}
            {this.props.job.editingJob.customer.phone},{" "}
            {this.props.job.editingJob.status}
          </h2>
          <div className="card-body">
            <form onSubmit={this.handleSubmit} autoComplete="one">
              <div className="form-group">
                <label htmlFor="street_1">Street 1</label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  className="form-control"
                  name="street_1"
                  id="street_1"
                  value={this.state.street_1}
                />
              </div>
              <div className="form-group">
                <label htmlFor="street_2">Street 2</label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  className="form-control"
                  name="street_2"
                  id="street_2"
                  value={this.state.street_2}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  className="form-control"
                  name="city"
                  id="city"
                  value={this.state.city}
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  className="form-control"
                  name="state"
                  id="state"
                  value={this.state.state}
                />
              </div>
              <div className="form-group">
                <label htmlFor="zip">Zip</label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  className="form-control"
                  name="zip"
                  id="zip"
                  value={this.state.zip}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor={`add-to-description${this.props.job.editingJob.id}`}
                >
                  Description
                </label>
                <textarea
                  onChange={this.handleChange}
                  name="description"
                  className="form-control"
                  id={`add-to-description${this.props.job.id}`}
                  rows="3"
                  value={this.state.description}
                />
              </div>

              <div className="form-group">
                Date: {this.state.schedule_date}
                <label htmlFor="date" />
                <input
                  onChange={this.handleDateChange}
                  id="date"
                  className="form-control"
                  value={this.state.date}
                  type="date"
                  name="date"
                  min=""
                  max=""
                />
              </div>

              <div className="form-group">
                <label htmlFor="jobStatusSelect">Change Status</label>
                <select
                  onChange={this.handleChange}
                  className="form-control"
                  name="status"
                  id={`jobStatusSelect${this.props.job.editingJob.id}`}
                  value={this.state.status}
                >
                  {this.selectionOptionStatus()}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="jobPaymentSelect">Change  Payment Type</label>
                <select
                  onChange={this.handleChange}
                  className="form-control"
                  name="payment_type"
                  id={`jobPaymentSelect${this.props.job.editingJob.id}`}
                  value={this.state.payment_type}
                >
                  {this.selectionOptionPayment()}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="paid">Paid? </label>
                {this.paidRadioButtons()}
              </div>

              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps =(dispatch) =>{
 return {
   updateJob: (body, jobId, callback) => {
     dispatch(updateJobAction(body, jobId, callback))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    job: state.jobReducer
  }
}
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Job))


