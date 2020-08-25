import { baseUrl } from "../../shared/ServerConf";


export const RESETPASS_PROCESSNG = "RESETPASS_PROCESSING";
export const RESETPASS_PROCESSED = "RESETPASS_PROCESSED";
export const RESETPASS_FAILED = "RESETPASS_FAILED";
export const RESETPASS_REFRESH = "RESETPASS_REFRESH";

export const processForgetPassword = (username,oldPassword, newPassword) => (dispatch) => {
  console.log(username,oldPassword,newPassword);
  dispatch({
    type: RESETPASS_PROCESSNG,
    payload: null
  });
  console.log("process Forget Password Action Creator Called");
  const hit = fetch(baseUrl + 'shopkeeper/login',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      shop_name: username,
      password: password,
    })
  })
  .then((response) => {
    console.log(response);
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
    console.log(response);
    var error = new Error(error.message);
    throw error;
  })
  .then(response => response.json())
  .then((responseJson) => {
    console.log("dispatching login processed");
    dispatch({
        type: RESETPASS_PROCESSED,
        payload: responseJson
      });
    })
  .catch((error) => {
    console.log("dispatching login failed", error);
    dispatch({
        type: RESETPASS_FAILED,
        payload: error.message
      });
  })
  .then(() => {
    console.log("dispatching login refreshed");
    dispatch({
        type: RESETPASS_REFRESH,
        payload: null
      });
  });
  return hit;
}
