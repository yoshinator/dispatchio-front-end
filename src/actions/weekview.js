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


//NOT BEING USED AT THE MOMENT MAYBE CAN REMOVE THIS CODE FROM JOBS COMPONENT LATER
// export const getWeekAction = () => {
//   const week = []
//   for (let i = 0; i < 7; i++) {
//     const day = new Date()
//     const a = new Date(day.setDate(day.getDate() + i))
//     week.push(a.toLocaleString(
//       "en-US",
//       {
//         month: "numeric",
//         day: "numeric",
//         year: "numeric"
//       }
//     ))
//   }
//   return ({type: "ADD_WEEK", payload: week})
// }