import JSONAPIAdapter from '../adapters/ApiAdapter'
const JOBAdapter = new JSONAPIAdapter("api/v1/jobs/user_date");




export const getJobsAction = (day, id) => {
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


