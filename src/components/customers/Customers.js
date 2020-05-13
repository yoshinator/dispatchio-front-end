import React, { Component } from 'react'
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import withAuth from "../../hocs/withAuth";
import withRoleManager from "../../hocs/withRoleManager"
import { editCustomerFlagAction, addCustomerToEditAction, createNewCustomerFlagAction } from "../../actions/customer";

class Customers extends Component {

  customersJSX = () => {

    if (this.props.customers.customers && this.props.customers.customers.length > 0) {
      return this.props.customers.customers.map(customer => (
        <p className="card-content">
          {customer.name} {customer.city}{" "}
          <a className="button" href={`tel:${customer.phone}`}><i class="fas fa-mobile-alt"></i> {customer.phone} </a>
          <button className="button"
            type="button"
            onClick={() => this.handleClick(customer)}
          >
            edit
          </button>
        </p>
      ));
    }
  }

  renderCustomers = () => {
    return (
      <div>
        <h2>
          Customers
        </h2>
        {this.customersJSX()}
      </div>
    )
  }

  handleClick =(customer)=> {
    this.props.editCustomer(customer)
    this.props.editCustomerFlag()
  }

  createNewCustomer = () => {
    this.props.createNewCustomerFlag();
  }

  render() {
    if (this.props.customers.editingCustomer) {
      return <Redirect to="/editcustomer"></Redirect>
    }else if (this.props.customers.createCustomerFlag){
      return <Redirect to="/createcustomer" />;
    } else { 
    return (
        <main className="container">
          <div className="card">
            <div>{this.renderCustomers()}</div>
          </div>
          <button className="button" onClick={this.createNewCustomer}>
            Add New Customer
          </button>
        </main>
      )
    }
  }
}


const mapStateTopProps = ({ customerReducer: customers, customer, editingCustomer})=>{
 return {
   customers,
   customer, 
   editingCustomer
  }
}
 
const mapDispatchToProps = (dispatch)  => {
  return {
    editCustomerFlag: () => {
      dispatch(editCustomerFlagAction())
    },
    editCustomer: (customer) => {
      dispatch(addCustomerToEditAction(customer));
    },
    createNewCustomerFlag: () => {
      dispatch(createNewCustomerFlagAction())
    }
  }
}

export default withRoleManager(withAuth(connect(mapStateTopProps, mapDispatchToProps)(Customers)))