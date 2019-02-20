import JSONAPIAdapter from '../adapters/ApiAdapter'
const LOGINAdapter = new JSONAPIAdapter("api/v1/users/login");
const CURRENTUserAdapter = new JSONAPIAdapter("api/v1/users/current")
const USERAdapter = new JSONAPIAdapter("api/v1/users")



export const loginAction = (email, password) => {
  return  (dispatch) => { 
    // dispatch({ type: 'AUTHENTICATING_USER' })
    dispatch(authenticatingUser())
    const body = { user: {email: email, password: password}}
    LOGINAdapter.createItem(body)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(JSONResponse => {
        localStorage.setItem('jwt', JSONResponse.jwt)
        dispatch(setCurrentUser(JSONResponse.user));
      })
      .catch(r => r.json().then(e => dispatch({ type: 'FAILED_LOGIN', payload: e.message })))
  }
}

export const createUserAction = ({user_type, f_name, l_name, email, phone, password, company_id, location_id}) => {
  return  (dispatch) => { 
    // dispatch({ type: 'AUTHENTICATING_USER' })
    dispatch(authenticatingUser())
    const body = { user: { user_type, f_name, l_name, email, phone, password, company_id, location_id}}
//  debugger
    USERAdapter.createItem(body)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(JSONResponse => {
        // debugger;
        localStorage.setItem("jwt", JSONResponse.jwt);
        dispatch(setCurrentUser(JSONResponse.user));
      })
      .catch(r =>
        r
          .json()
          .then(e => dispatch({ type: "FAILED_LOGIN", payload: e.message }))
      );
  }
}

// IS THIS EVEN USED???? MIGHT BE HANDLED IN ./team.js
// HAHA I'm using it now!
  export const updateUserAction = (body, userId) => {
    return (dispatch) => {
      USERAdapter.updateItem(body, userId)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw response;
          }
        })
        .then(JSONResponse => {
          dispatch({ type: "UPDATE_USER", payload: JSONResponse });
        });
    }
  }

export const fetchCurrentUser = () => {
  // takes the token in localStorage and finds out who it belongs to
  return (dispatch) => {
    dispatch(authenticatingUser()) //tells the app we are fetching
    CURRENTUserAdapter.getAll()
      .then( response => {
        return  dispatch(setCurrentUser(response))
        })
  }
}

export const setCurrentUser = (userData) => ({
  type: 'SET_CURRENT_USER',
  payload: userData
})

export const failedLogin = (errorMsg) => ({
  type: 'FAILED_LOGIN',
  payload: errorMsg
})

export const logOutAction = () =>({
  type: 'LOG_OUT'
})

// tell our app we're currently fetching
export const authenticatingUser = () => ({ type: 'AUTHENTICATING_USER' })
// export const authenticatingUser = () => {
//   return { type: 'AUTHENTICATING_USER' }
// }