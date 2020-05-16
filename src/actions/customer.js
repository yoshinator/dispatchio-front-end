// CUSTOMER ACTION CREATOR
import JSONAPIAdapter from "../adapters/ApiAdapter";
const CUSTOMERSAdapter = new JSONAPIAdapter('api/v1/customers/location');
const CUSTOMERAdapter = new JSONAPIAdapter('api/v1/customers')

export const getCustomersAction =(locationId) => {
  return (dispatch) => {
    const body = {
      "customers": {
        "location_id": locationId
      }
    }
    CUSTOMERSAdapter.createItem(body)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw response
      }
    })
    .then(JSONResponse => {
      dispatch({ type: "GET_CUSTOMERS", payload: JSONResponse })
    })
  }
}

export const editCustomerAction = (body, id) => {
  return dispatch => {
    CUSTOMERAdapter.updateItem(body, id)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(JSONResponse => {
        dispatch({ type: "EDIT_CUSTOMER", payload: JSONResponse });
      });
  };
};

export const createCustomerAction = (body) => {
  return dispatch => {
    CUSTOMERAdapter.createItem(body)
    .then(response => {
      if (response.ok ){
        return response.json();
      } else {
        throw response;
      }
    })
    .then(r => {
        dispatch({type: "CREATE_CUSTOMER", payload: r})
    } )
  }
}


export const addCustomerToEditAction =(customer) => {
  return { type: "ADD_CUSTOMER_TO_EDIT" , payload: customer}
} 

export const editCustomerFlagAction = () => {
  return { type: "EDIT_CUSTOMER_FLAG"}
}

export const createNewCustomerFlagAction = () => {
  return { type: "CREATE_CUSTOMER_FLAG"}
}