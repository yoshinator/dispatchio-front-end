import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import withAuth from '../../hocs/withAuth';
import withRoleManager from '../../hocs/withRoleManager';
import { createJobAction } from '../../actions/job';
import { getTeamsAction } from '../../actions/team';
import YOANHelpers from "../../helpers/helpers";
import { getCustomersAction } from '../../actions/customer';
const timeHelper = new YOANHelpers();

class CreateJob extends Component {

  state = {
    customer_id: "",
    location_id: "",
    team_id: "",
    street_1: "",
    street_2: "",
    city: "",
    zip: "",
    state: "",
    price: "",
    schedule_date: "",
    schedule_time: "",
    description: "",
    date: ""
  }

  componentDidMount() {
    this.props.getTeams(this.props.user.location.id)
    if (!this.props.customers){
      getCustomers(this.props.user.location.id)
    }
    this.setState({
      location_id: this.props.user.location.id,
      date: timeHelper.getDay()
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

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

  getCustomerOptions = () => {
    if (this.props.customers){
      return this.props.customers.map(customer => {
        return <option key={customer.id} value={customer.id}> {customer.name}, {customer.city}</option >
      })
    }
  }

  getTeamOptions = () => {
    if (this.props.teams){
      return this.props.teams.map(team => {
        return <option key={team.id} value={team.id}> {team.name} </option>
      })
  }
  }

  handleSubmit = (event) => {

    event.preventDefault()
    this.props.createJob(this.state)
  }


  render() {

    if (this.props.createJobFlag) {
      return (
        <div className="container">
          <div className="form-container">
            <h2>Create New Job</h2>
            <div className="form">
              <form onSubmit={this.handleSubmit} autoComplete="one">

                  <label htmlFor="customer_id">Customer</label>
                  <select onChange={this.handleChange} name="customer_id" id="customer_id">
                  <option value="" />
                    {this.getCustomerOptions()}
                  </select>


                  <label htmlFor="team_id">Team</label>
                  <select onChange={this.handleChange} name="team_id" id="team_id">
                  <option value=""  />
                    {this.getTeamOptions()}
                  </select>

                  <label htmlFor="street-1">Street 1</label>
                  <input onChange={this.handleChange} type="text" name="street_1" id="street-1" value={this.state.street_1} />
     
                  <label htmlFor="street-2">Street 2</label>
                  <input onChange={this.handleChange} type="text" name="street_2" id="street-2" value={this.state.street_2} />
 
                  <label htmlFor="city">City</label>
                  <input onChange={this.handleChange} type="text" name="city" id="city" value={this.state.city} />
  
                  <label htmlFor="zip">Zip</label>
                  <input onChange={this.handleChange} type="text" name="zip" id="zip" value={this.state.zip} />
           
                  <label htmlFor="state">State</label>
                  <select onChange={this.handleChange} name="state" id="state">
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                  <label htmlFor="price">
                    Price leave blank for none
                  </label>
                  <input onChange={this.handleChange} type="number"  name="price" id="price" value={this.state.price} />
   
                  
                  <label htmlFor="date" >Date</label>
                  <input onChange={this.handleDateChange} id="date"  value={this.state.date} type="date" name="date" min="" max="" />
             
                  <label htmlFor="schedule_time">Time </label>
                  <input onChange={this.handleChange} type="time" name="schedule_time" id="schedule_time" value={this.state.schedule_time} />
             
                <button className="button" type="submit">
                  Create
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

export const mapStateTopProps = ({ customerReducer: { customers}, loginReducer: { user }, jobReducer: {createJobFlag}, teamReducer: {teams} }) => {
  return {
    customers,
    user,
    createJobFlag,
    teams

  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    createJob: (body) => {
      dispatch(createJobAction(body))
    }, 
    getTeams: (locationId) => {
      dispatch(getTeamsAction(locationId))
    },getCustomers: locationId => {
      dispatch(getCustomersAction(locationId))
    }
  }

}
export default withRoleManager(withAuth(connect(mapStateTopProps, mapDispatchToProps)(CreateJob))
);