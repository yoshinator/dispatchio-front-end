import JSONAPIAdapter from '../adapters/ApiAdapter'
const JOBAdapter = new JSONAPIAdapter("api/v1/jobs/user_date");
const JOBSAdapter = new JSONAPIAdapter("api/v1/jobs/week");
const JOBUpdater = new JSONAPIAdapter("api/v1/jobs")



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


export const addWeekAction = (week, location_id) => {
  console.log("IN GET WEEK ACTION")
  return (dispatch) => {
  
    const body = {
      "job": {
        "week": week,
        "location_id": location_id
      }
    }
    JOBSAdapter.createItem(body)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(JSONResponse => {
        dispatch({ type: "GET_WEEK", payload: JSONResponse })
      })
  }
}


export const updateJobAction = (body, jobId, cb) => {
  return (dispatch) => {
    JOBUpdater.updateItem(body, jobId)
      .then(response => {
        if (response.ok) {
          cb()
          return response.json();
        } else {
          throw response;
        }
      })
      .then(JSONResponse => {
        console.log(JSONResponse);
        dispatch({ type: "UPDATE_JOB", payload: JSONResponse });
      });
  }
}

// SETS THE JOB MANAGER AND EMPLOYEES ARE VIEWING TO EDIT OR CHANGE
export const editJobAction = (job) => {
  return ({type: "EDIT_JOB", payload: job})
}