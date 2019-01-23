import JSONAPIAdapter from "../adapters/ApiAdapter";
const TeamLocationAdapter = new JSONAPIAdapter('api/v1/teams/location');
const TeamMemberAdapter = new JSONAPIAdapter('api/v1/users/location');
const TEAMAdapter = new JSONAPIAdapter('api/v1/teams');
const TEAMMEMBERAdapter = new JSONAPIAdapter('api/v1/team_users')
const TEAMMEMBERREMOVALAdapter = new JSONAPIAdapter(
  "api/v1/team_users/remove"
);
const USERAdapter = new JSONAPIAdapter('api/v1/users');


export const getTeamsAction =(locationId) => {
  return (dispatch) => {
    const body = {
      "team": {
        "location_id": locationId

      }
    }
    TeamLocationAdapter.createItem(body)
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
//user object
export const createTeamMemberAction = ( user ) => {
  return dispatch => {
    USERAdapter.createItem(user)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw response;
      }
    })
    .then(JSONResponse => {

      dispatch({type: "CREATE_TEAM_MEMBER", payload: JSONResponse});
    })
  }
}

export const createNewTeamMemberFlagAction =() => {
  return { type: "CREATE_TEAM_MEMBER_FLAG" }
}

  export const setTeamMemberAction = (teamMember) => {
  
    return ({type: "SET_TEAM_MEMBER", payload: teamMember})
  }

export const createTeamAction = (team) => {
  return dispatch => {
    TEAMAdapter.createItem(team)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(JSONResponse => {

        dispatch({ type: "CREATE_TEAM", payload: JSONResponse });
      })
  }
}

export const changeTeamEditFlagAction = () => {
  return ({type: "CHANGE_TEAM_EDIT_FLAG"})
}

export const addMemberToTeamAction =(body) => {
  return dispatch => {
    TEAMMEMBERAdapter.createItem(body)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(JSONResponse => {
        dispatch({ type: "EDIT_TEAM", payload: JSONResponse });
      })
  }
}
//body = { user_id: userId, team_id: teamId}
export const removeTeamMemberFromTeam = (body) => {
  return dispatch => {
    TEAMMEMBERREMOVALAdapter.createItem(body)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(JSONResponse => {
        dispatch({ type: "EDIT_TEAM", payload: JSONResponse });
      });
  };
}

  export const changeTeamCreateFlagAction =() => {
    return ({ type: "CHANGE_TEAM_CREATE_FLAG"})
  }

  export const setTeamAction = (team) => {
    return ({type: "SET_TEAM", payload: team})
  }
