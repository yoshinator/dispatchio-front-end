import JSONAPIAdapter from "../adapters/ApiAdapter";
const TeamAdapter = new JSONAPIAdapter('api/v1/teams/location');
const TeamMemberAdapter = new JSONAPIAdapter('api/v1/users/location')
const USERAdapter = new JSONAPIAdapter('api/v1/users')

export const getTeamsAction =(locationId) => {
  return (dispatch) => {
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
        console.log("TEAMS RESPONSE JSON", JSONResponse)
        dispatch({ type: "GET_TEAMS", payload: JSONResponse })
      })
    }
}

export const getTeamMembersAction =(locationId) => {
  return (dispatch) => {
    const body = {
      "user": {
        "location_id": locationId
      }
    }
    TeamMemberAdapter.createItem(body)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(JSONResponse => {
        dispatch({ type: "GET_TEAM_MEMBERS", payload: JSONResponse });
      });
    }
  }

  export const changeTeamMemberEditFlagAction =() => {
    return ({type: "CHANGE_TEAM_MEMBER_EDIT_FLAG"})
  }


  export const updateTeamMemberAction = (body, id) => {
    return dispatch => {
      USERAdapter.updateItem(body, id)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw response;
          }
        })
        .then(JSONResponse => {
          dispatch({ type: "EDIT_TEAM_MEMBER", payload: JSONResponse });
        });
    };
  }

export const createNewTeamMemberFlagAction =() => {
  return { type: "CREATE_TEAM_MEMBER_FLAG" }
}

  export const setTeamMemberAction = (teamMember) => {
  
    return ({type: "SET_TEAM_MEMBER", payload: teamMember})
  }

