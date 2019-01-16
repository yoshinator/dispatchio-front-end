import React, { Component } from 'react'
import { connect } from 'react-redux'
import './job.css'

import { updateJobAction } from '../actions/job';


class Job extends Component {
  state = {
    street_1: "",
    street_2: "",
    city: "",
    zip: "",
    description: "",
    status: "",
    payment_type: ""

  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.payment_type)
    const body = {
      street_1: this.state.street_1,
      street_2: this.state.street_2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      description: this.state.description,
      status: this.state.status,
      payment_type: this.state.payment_type
    };
    this.props.updateJob(body, this.state.id, this.props.changeView)

  };

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

  componentDidMount() {
    this.setState(
      {
        ...this.state,
        ...this.props.job
      },
      () => console.log("IN COMPONENT DID MOUNT", this.state)
    );
  }

  render() {
    console.log("RRRRRENNNNDERING",this.state);
    return (
      <>
        <div className="card inner-card">
          <h2 className="job-edit-title">
            {this.props.job.city}, {this.props.job.customer.name}{" "}
            {this.props.job.customer.phone}, {this.props.job.status}
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
                <label htmlFor={`add-to-description${this.props.job.id}`}>
                  Description
                </label>
                <textarea
                  onChange={this.handleChange}
                  name="description"
                  className="form-control"
                  id={`add-to-description${this.props.job.id}`}
                  rows="2"
                  value={this.state.description}
                />
              </div>
              <div className="form-group">
                <label htmlFor="jobStatusSelect">Change Status</label>
                <select
                  onChange={this.handleChange}
                  className="form-control"
                  name="status"
                  id={`jobStatusSelect${this.props.job.id}`}
                  value={this.state.status}
                >
                  {this.selectionOptionStatus()}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="jobPaymentSelect">Change Status</label>
                <select
                  onChange={this.handleChange}
                  className="form-control"
                  name="payment_type"
                  id={`jobPaymentSelect${this.props.job.id}`}
                  value={this.state.payment_type}
                >
                  {this.selectionOptionPayment()}
                </select>
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

const mapStateToProps = (state) => ({
job: state.jobReducer
})
 
export default connect(mapStateToProps, mapDispatchToProps)(Job)


