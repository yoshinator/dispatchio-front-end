//JOB ACTION CREATOR 
import JSONAPIAdapter from '../adapters/ApiAdapter'
const JOBAdapter = new JSONAPIAdapter("api/v1/jobs/user_date");
const JOBSAdapter = new JSONAPIAdapter("api/v1/jobs/week");
const JOBUpdater = new JSONAPIAdapter("api/v1/jobs")



// ONLY FOR TO RENDER EMPLOYEE JOBS FOR THE DAY
export const getEmployeeJobsAction = (day, id) => {
  return (dispatch) => {
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
          dispatch({type: "GET_JOBS", payload: JSONResponse})
      })
  }
}// END getEmployeeJobsAction

// takes a week array [1/19/2018,'1/20/2018',...,x/x/2018] and a location_id only for MANAGER and OWNER view.
export const addWeekAction = (week, location_id) => {
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

export const updateJobAction = (body, jobId) => {
  return (dispatch) => {
    JOBUpdater.updateItem(body, jobId)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(JSONResponse => {
        dispatch({ type: "UPDATE_JOB", payload: JSONResponse });
      });
  }
}

export const createJobAction = (body) => {
  return dispatch => {
    JOBUpdater.createItem(body)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(r => {
        dispatch({ type: "CREATE_JOB", payload: r });
      });
  }
}

// SETS THE JOB MANAGER AND EMPLOYEES ARE VIEWING TO EDIT OR CHANGE
export const editJobAction = (job) => {
  return ({type: "EDIT_JOB", payload: job})
}

export const createJobFlagAction = () =>{
  return ({type: "CREATE_JOB_FLAG"})
 }