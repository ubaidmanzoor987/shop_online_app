import { baseUrl } from "../../shared/ServerConf";


export const UPDATE_PROCESSNG = "UPDATE_PROCESSING";
export const UPDATE_PROCESSED = "UPDATE_PROCESSED";
export const UPDATE_FAILED = "UPDATE_FAILED";
export const UPDATE_REFRESH = "UPDATE_REFRESH";

export const processUpdatePassword = (update_passwordDetails) => (dispatch) => {
  //console.log("This is UpdatePasserod Details Obj",update_passwordDetails);
  dispatch({
    type: UPDATE_PROCESSNG,
    payload: null
  });
  //console.log("process upDATE Password Action Creator Called");
  const hit = fetch(baseUrl + 'shopkeeper/update_password',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(update_passwordDetails)
  })
  .then((response) => {
    //console.log(response);
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
    //console.log("This is Resposne in Update Processing",response);
    var error = new Error(error.message);
    throw error;
  })
  .then(response => response.json())
  .then((responseJson) => {
    //console.log("dispatching UPDATEpassword processed");
    dispatch({
        type: UPDATE_PROCESSED,
        payload: responseJson
      });
    })
  .catch((error) => {
    console.log("dispatching UPDATEpassword failed", error);
    dispatch({
        type: UPDATE_FAILED,
        payload: error.message
      });
  })
  .then(() => {
    console.log("dispatching UPDATEpassword refreshed");
    dispatch({
        type: UPDATE_REFRESH,
        payload: null
      });
  });
  return hit;
}
