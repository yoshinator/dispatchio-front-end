import {
  GET_CUSTOMERS,
  EDIT_CUSTOMER_FLAG,
  EDIT_CUSTOMER,
  ADD_CUSTOMER_TO_EDIT,
  CREATE_CUSTOMER_FLAG,
  CREATE_CUSTOMER
} from "./types";

const initialState = {
  customers: [],
  customer: {},
  editingCustomer: false, 
  createCustomerFlag: false
}


const customerReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_CUSTOMERS:
      return {...initialState, customers: action.payload}

    case EDIT_CUSTOMER_FLAG: 
      return {...state, editingCustomer: true}

    case EDIT_CUSTOMER: 
      return { customers: state.customers.filter(customer => customer.id !== action.payload.id).concat(action.payload), customer: initialState.customer, editingCustomer: false }

    case ADD_CUSTOMER_TO_EDIT:
      return {...state, customer: action.payload}

    case CREATE_CUSTOMER_FLAG: 
      return {...state, createCustomerFlag: true}

    case CREATE_CUSTOMER: 
      return {...state, customers: [...state.customers, action.payload], createCustomerFlag: false}
      
    default:
      return state;
  }
};

export default customerReducer;
