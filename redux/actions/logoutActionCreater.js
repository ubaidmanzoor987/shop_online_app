import { baseUrl } from "../../shared/ServerConf";

export const LOGOUT_PROCESSNG = "LOGOUT_PROCESSING";
export const LOGOUT_PROCESSED = "LOGOUT_PROCESSED";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const LOGOUT_REFRESH = "LOGOUT_REFRESH";

export const processLogout = (a) => (dispatch) => {
  
  dispatch({
    type: LOGOUT_PROCESSNG,
    payload: null
  });
  console.log("Process Logout Dispatch Called");
  const hit = fetch(baseUrl + 'shopkeeper/logout',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
  .then((response) => {
    console.log('Test', JSON.stringify(response));
    if(response.ok)
    {
      return response;
    }
    else{
      var error = new Error('Error ' + response.status + ': ' + response.statusText );
      error.response = response;
      throw error;
    }
  },error => {
    console.log('Test', JSON.stringify(response));
    var error = new Error(error.message);
    throw error;
  })
  .then(response => response.json())
  .then((responseJson) => {
    console.log("dispatching logout processed");
    dispatch({
        type: LOGOUT_PROCESSED,
        payload: responseJson
      });
    })
  .catch((error) => {
    console.log("dispatching logout failed", error);
    dispatch({
        type: LOGIN_FAILED,
        payload: error.message
      });
  })
  .then(() => {
    console.log("dispatching logout refreshed");
    dispatch({
        type: LOGOUT_REFRESH,
        payload: null
      });
  });
  return hit;
}
