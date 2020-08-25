import { baseUrl } from "../../shared/ServerConf";


export const SIGNUP_PROCESSNG = "SIGNUP_PROCESSING";
export const SIGNUP_PROCESSED = "SIGNUP_PROCESSED";
export const SIGNUP_FAILED = "SIGNUP_FAILED";
export const SIGNUP_REFRESH = "SIGNUP_REFRESH";


export const processSignUp = (signUpDetails) => (dispatch) => {
  console.log("process sign up Action Creator Called");
  console.log("Dispatching Action Creator Called");
  dispatch({
    type: SIGNUP_PROCESSNG,
    payload: null
  });
  const hit = fetch(baseUrl + 'shopkeeper/insert_shopkeeper',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signUpDetails)
  })
  .then((response) => {
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
    var error = new Error(error.message);
    throw error;
  })
  .then(response => response.json())
  .then((responseJson) => {
    console.log("dispatching SignUp Processed")
    dispatch({
        type: SIGNUP_PROCESSED,
        payload: responseJson
      });
    })
  .catch((error) => {
    console.log("Error: ",error.message, error.filename, error.lineNumber);
    dispatch({
        type: SIGNUP_FAILED,
        payload: error.message
      });
  })
  .then(()=>{
    dispatch({
      type:SIGNUP_REFRESH,
      payload:null
    })
  });
  return hit;
}
