// CUSTOMER ACTION CREATOR
import JSONAPIAdapter from "../adapters/ApiAdapter";
const CUSTOMERSAdapter = new JSONAPIAdapter('api/v1/customers/location');

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


export const addCustomerToEditAction =(customer) => {
  return { type: "ADD_CUSTOMER_TO_EDIT" , payload: customer}
} 

export const editCustomerFlagAction = () => {
  return { type: "EDIT_CUSTOMER_FLAG"}
}