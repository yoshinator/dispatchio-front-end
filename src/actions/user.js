import JSONAPIAdapter from '../ApiAdapter'
const LOGINAdapter = new JSONAPIAdapter("api/v1/users/login");



export const loginAction = (email, password) => {
  return  (dispatch) => { //thunk

    dispatch({ type: 'AUTHENTICATING_USER' })

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
        console.log('%c INSIDE YE OLDE .THEN', 'color: navy', JSONResponse)
        localStorage.setItem('jwt', JSONResponse.jwt)
        dispatch({ type: 'SET_CURRENT_USER', payload: JSONResponse.user })
        // dispatch(setCurrentUser(JSONResponse.user))
      })
      .catch(r => r.json().then(e => dispatch({ type: 'FAILED_LOGIN', payload: e.message })))
  }
}

export const fetchCurrentUser = () => {
  // takes the token in localStorage and finds out who it belongs to
  return (dispatch) => {
    dispatch(authenticatingUser()) //tells the app we are fetching
    fetch(`http://localhost:3000/api/v1/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(response => response.json())
      .then((JSONResponse) => dispatch(setCurrentUser(JSONResponse.user)))
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

// tell our app we're currently fetching
export const authenticatingUser = () => ({ type: 'AUTHENTICATING_USER' })
// export const authenticatingUser = () => {
//   return { type: 'AUTHENTICATING_USER' }
// }