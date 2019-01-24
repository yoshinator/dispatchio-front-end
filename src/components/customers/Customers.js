import React, { Component } from 'react'
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import Sidebar from "../Sidebar";
import withAuth from "../../hocs/withAuth";
import withRoleManager from "../../hocs/withRoleManager"
import { editCustomerFlagAction, addCustomerToEditAction, createNewCustomerFlagAction } from "../../actions/customer";

class Customers extends Component {

  customersJSX = () => {

    if (this.props.customers.customers && this.props.customers.customers.length > 0) {
      return this.props.customers.customers.map(customer => (
        <p className="list-group-item">
          {customer.name} {customer.city}{" "}
          <a href={`tel:${customer.phone}`}>{customer.phone} </a>
          <button
            type="button"
            onClick={() => this.handleClick(customer)}
            className="btn btn-primary float-right"
          >
            edit
          </button>
        </p>
      ));
    }
  }

  renderCustomers = () => {
    return (
      <div className="col-sm">
        <div className="list-group">
          <span className="list-group-item list-group-item-action active">
            Customers
          </span>
          {this.customersJSX()}
        </div>
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
    return <Sidebar>
        <main className="col">
          <button onClick={this.createNewCustomer} className="mx-auto create-new-button" style={{ display: "block" }}>
            <span>Create Customer</span>{" "}
          </button>

          <div className="container">
            <div className="row">{this.renderCustomers()}</div>
          </div>
        </main>
      </Sidebar>;
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