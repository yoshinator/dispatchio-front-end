import JSONAPIAdapter from "../adapters/ApiAdapter";
const TeamAdapter = new JSONAPIAdapter();

export const getLocationTeamsAction =(locationId) => {
  return (dispatch) => {
      // I WOULD LIKE TO PUT A SPINNER HERE OF SOMEKIND WHILE WE LOAD.
      dispatch({type: "AUTHENTICATING USER"});

    const body = {
      "team": {
        "location_id": locationId

      }
    }

    TeamAdapter.createItem(body)
      .then(response => {
        if (response.ok) {
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