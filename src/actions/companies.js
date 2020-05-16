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

export const createCompanyAction = (body) => {
  return (dispatch) => {COMPANIESAdapter.createItem(body)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw response;
      }
    })
    .then(r => {
      dispatch({ type: "UPDATE_USER", payload: { location: r.locations[0]} })
    })
  }

}
  
