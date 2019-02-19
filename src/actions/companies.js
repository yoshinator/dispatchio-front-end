//COMPANIES ACTION CREATOR 
import JSONAPIAdapter from '../adapters/ApiAdapter'
const COMPANIESAdapter = new JSONAPIAdapter("api/v1/companies");


export const getCompaniesAction = () => {
  return (dispatch) => {COMPANIESAdapter.getAll()
    .then(response => {
      dispatch({ type: "GET_COMPANIES", payload: response })
    })
  }
}