import React, { Component } from 'react'
import {connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import withAuth from '../../hocs/withAuth'
import withRoleManager from '../../hocs/withRoleManager'
import Sidebar from '../Sidebar'
import {editCustomerAction} from '../../actions/customer'

class EditCustomer extends Component {
  state={

      name: "",
      poc: "",
      street_1: "",
      street_2: "",
      city: "",
      zip: "",
      state: "",
      phone: "",
      email: "",
      id: "",
      location_id: ""

  }

  componentDidMount(){
    this.setState({
      ...this.props.customer.customer
    })
  }

  handleChange =(event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
  }


  handleSubmit = (event) => {
    event.preventDefault()
    this.props.editCustomer(this.state, this.state.id)
  }
  render() {
    if (this.props.customer.editingCustomer){
    return  <Sidebar>
              <div>
                <h2>
                  EDIT CUSTOMER INFO 
                </h2>
              <div>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label htmlFor="customer-name">Customer Name</label>
                  <input onChange={this.handleChange} type="text"  name="name" id="customer-name"  value={this.state.name}/>
                </div>
                <div>
                  <label htmlFor="point0of-contact">Point of Contact</label>
                  <input onChange={this.handleChange}type="text"  name="poc" id="point-of-contact"  value={this.state.poc}/>
                </div>
                <div>
                  <label htmlFor="street-1">Street 1</label>
                  <input onChange={this.handleChange}type="text"  name="street_1" id="street-1"  value={this.state.street_1}/>
                </div>
                <div>
                  <label htmlFor="street-2">Street 2</label>
                  <input onChange={this.handleChange}type="text"  name="street_2" id="street-2"  value={this.state.street_2}/>
                </div>
                <div>
                  <label htmlFor="city">City</label>
                  <input onChange={this.handleChange}type="text"  name="city" id="city"  value={this.state.city}/>
                </div>
                <div>
                  <label htmlFor="zip">Zip</label>
                  <input onChange={this.handleChange}type="text"  name="zip" id="zip"  value={this.state.zip}/>
                </div>
                  <div>
                    <label htmlFor="jobPaymentSelect">
                      State
                      </label>
                    <select onChange={this.handleChange}  name="state" id="state" >
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
                  </div>

                <div>
                  <label htmlFor="customer-phone">Phone</label>
                  <input onChange={this.handleChange}type="phone"  name="phone" id="customer-phone"  value={this.state.phone}/> 
                </div>
                <div>
                  <label htmlFor="customer-email">Customer email</label>
                  <input onChange={this.handleChange}type="email"  name="email" id="customer-email"  value={this.state.email}/>
                </div>
                      <button type="submit" >Update</button>
                </form>
              </div>
              </div>
            </Sidebar>
    }
    else return <Redirect to="/customers"></Redirect>
  }
}


const mapStateTopProps = ({ customerReducer: customer}) => {
  return {
    customer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editCustomer: (customer, customer_id) => {
      dispatch(editCustomerAction(customer, customer_id))
    }
  }
}



export default withRoleManager(withAuth(connect(mapStateTopProps, mapDispatchToProps)(EditCustomer)))