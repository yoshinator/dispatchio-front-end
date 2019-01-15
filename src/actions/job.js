import JSONAPIAdapter from '../adapters/ApiAdapter'
const JOBAdapter = new JSONAPIAdapter("api/v1/jobs/user_date");
const JOBSAdapter = new JSONAPIAdapter("api/v1/jobs/date");




export const getEmployeeJobsAction = (day, id) => {
  console.log("job Action getJobsAction")
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
}

export const getJobsAction = (day) => {

  return (dispatch) => {

    console.log("IN ACTION CREATOR")
    // I WOULD LIKE TO PUT A SPINNER HERE OF SOMEKIND WHILE WE LOAD.
    dispatch({ type: 'AUTHENTICATING USER' })

  const body = {
    "job": {
      "schedule_date": day
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
      console.log(JSONResponse)
      dispatch({ type: "GET_JOBS", payload: JSONResponse })
    })
  }

}