import JSONAPIAdapter from "../adapters/ApiAdapter";

const JOBSAdapter = new JSONAPIAdapter("api/v1/jobs/week");

export const addWeekAction = (week, location_id) =>{
  return (dispatch) => {

    console.log("IN ACTION CREATOR")
    // I WOULD LIKE TO PUT A SPINNER HERE OF SOMEKIND WHILE WE LOAD.
    dispatch({ type: 'AUTHENTICATING USER' })

    const body = {
      "job": {
        "week": week,
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
        console.log(JSONResponse)
        dispatch({ type: "ADD_DAY", payload: JSONResponse })
      })
  }
}

