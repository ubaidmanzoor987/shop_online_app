import { baseUrl } from "../../shared/ServerConf";


export const LOGIN_PROCESSNG = "LOGIN_PROCESSING";
export const LOGIN_PROCESSED = "LOGIN_PROCESSED";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_REFRESH = "LOGIN_REFRESH";

export const processLogin = (username, password) => (dispatch) => {
  console.log(username,password);
  dispatch({
    type: LOGIN_PROCESSNG,
    payload: null
  });
  console.log("process login Action Creator Called");
  const hit = fetch(baseUrl + 'shopkeeper/login',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_name: username,
      password: password,
    })
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
    console.log("dispatching login processed");
    dispatch({
        type: LOGIN_PROCESSED,
        payload: responseJson
      });
    })
  .catch((error) => {
    console.log("dispatching login failed", error);
    dispatch({
        type: LOGIN_FAILED,
        payload: error.message
      });
  })
  .then(() => {
    console.log("dispatching login refreshed");
    dispatch({
        type: LOGIN_REFRESH,
        payload: null
      });
  });
  return hit;
}
