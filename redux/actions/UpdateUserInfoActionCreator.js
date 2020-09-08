import { baseUrl } from "../../shared/ServerConf";


export const UPDATE_PROCESSNG = "UPDATE_PROCESSING";
export const UPDATE_PROCESSED = "UPDATE_PROCESSED";
export const UPDATE_FAILED = "UPDATE_FAILED";
export const UPDATE_REFRESH = "UPDATE_REFRESH";

export const processUpdateUserInfo = (updateDetails) => (dispatch) => {
    console.log("processUpdateUserInfo Action Creator Called");
    console.log("Dispatching Action Creator Called");
    dispatch({
      type: UPDATE_PROCESSNG,
      payload: null
    });
    const hit = fetch(baseUrl + 'shopkeeper/update_shopkeeper',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateDetails)
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
      console.log("dispatching UpdateUserInfo Processed")
      dispatch({
          type: UPDATE_PROCESSED,
          payload: responseJson
        });
      })
    .catch((error) => {
      console.log("Error: ",error.message, error.filename, error.lineNumber);
      dispatch({
          type: UPDATE_FAILED,
          payload: error.message
        });
    })
    .then(()=>{
      dispatch({
        type:UPDATE_REFRESH,
        payload:null
      })
    });
    return hit;
  }
  