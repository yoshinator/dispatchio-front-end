import JSONAPIAdapter from '../adapters/ApiAdapter'
const JOBAdapter = new JSONAPIAdapter("api/v1/jobs/user_date");
const JOBSAdapter = new JSONAPIAdapter("api/v1/jobs/date");



// ONLY FOR TO RENDER EMPLOYEE JOBS FOR THE DAY
export const getEmployeeJobsAction = (day, id) => {
  return (dispatch) => {
    // I WOULD LIKE TO PUT A SPINNER HERE OF SOMEKIND WHILE WE LOAD.
    dispatch({ type: 'AUTHENTICATING USER' })
    const body = {
        "job": {
        "schedule_date": day,
        "user_id": id
      }
    }

    JOBAdapter.createItem(body)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(JSONResponse => {
          console.log(JSONResponse)
          dispatch({type: "GET_JOBS", payload: JSONResponse})
      })
  }
}// END getEmployeeJobsAction


// WHERE THE HELL IS THIS BEING USED? 
export const getJobsAction = (day, location_id) => {
  return (dispatch) => {
    // I WOULD LIKE TO PUT A SPINNER HERE OF SOMEKIND WHILE WE LOAD.
    dispatch({ type: 'AUTHENTICATING USER' })

  const body = {
    "job": {
      "schedule_date": day,
      "location_id": location_id
    }
  }
  JOBSAdapter.createItem(body)
    .then(response => {
      if (response.ok) {
        console.log("THE RESPONSE", response)
        return response.json()
      } else {
        throw response
      }
    })
    .then(JSONResponse => {
      dispatch({ type: "GET_JOBS", payload: JSONResponse })
    })
  }
}// END GET JOBS ACTION 



// SETS THE JOB MANAGER AND EMPLOYEES ARE VIEWING TO EDIT OR CHANGE
export const setJobAction = (job) => {
  return ({type: "ADD_JOB", payload: job})
}