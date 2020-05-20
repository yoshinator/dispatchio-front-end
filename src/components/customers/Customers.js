import React from 'react'
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import withAuth from "../../hocs/withAuth";
import withRoleManager from "../../hocs/withRoleManager"
import { editCustomerFlagAction, addCustomerToEditAction, createNewCustomerFlagAction, getCustomersAction } from "../../actions/customer";

const Customers = (props) => {
  if (!props.customers){
    props.getCustomers(props.user.location.id)
  }
  const renderCustomers = () => {
    if (props.customers && props.customers.length > 0) {
      return props.customers.map(customer => (
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

  if (props.editingCustomer) {
    return <Redirect to="/editcustomer"></Redirect>
  }else if (props.createCustomerFlag){
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


const mapStateTopProps = ({ customerReducer:{ customers, customer, editingCustomer, createCustomerFlag}, loginReducer: {user}})=>{
 return {
   customers,
   customer, 
   editingCustomer,
   createCustomerFlag,
   user
  }
}
 
const mapDispatchToProps = (dispatch)  => {
  return {
    getCustomers: (locationId) => {
      dispatch(getCustomersAction(locationId))
    },
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