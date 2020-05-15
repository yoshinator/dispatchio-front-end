import React from 'react'
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import withAuth from "../../hocs/withAuth";
import withRoleManager from "../../hocs/withRoleManager"
import { editCustomerFlagAction, addCustomerToEditAction, createNewCustomerFlagAction } from "../../actions/customer";

const Customers = (props) => {

  const renderCustomers = () => {
    if (props.customers.customers && props.customers.customers.length > 0) {
      return props.customers.customers.map(customer => (
        <p key={customer.id} className="card-content">
          {customer.name} {customer.city}{" "}
          <a className="button" href={`tel:${customer.phone}`}><i className="fas fa-mobile-alt"></i> {customer.phone} </a>
          <button className="button"
            type="button"
            onClick={() => handleClick(customer)}
          >
            edit
          </button>
        </p>
      ));
    }
  }

  const handleClick =(customer)=> {
    props.editCustomer(customer)
    props.editCustomerFlag()
  }

  const createNewCustomer = () => {
    props.createNewCustomerFlag();
  }

  if (props.customers.editingCustomer) {
    return <Redirect to="/editcustomer"></Redirect>
  }else if (props.customers.createCustomerFlag){
    return <Redirect to="/createcustomer" />;
  } else { 
  return (
      <main className="container">
        <div className="card">
          <div>
            <h2> Customers</h2>
            {renderCustomers()}</div>
          </div>
        <button className="button" onClick={createNewCustomer}>
          Add New Customer
        </button>
      </main>
    )
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