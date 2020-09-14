import { baseUrl } from "../../../shared/ServerConf";

export const DELETEBRANDS_PROCESSNG = "DELETEBRANDS_PROCESSING";
export const DELETEBRANDS_PROCESSED = "DELETEBRANDS_PROCESSED";
export const DELETEBRANDS_FAILED = "DELETEBRANDS_FAILED";
export const DELETEBRANDS_REFRESH = "DELETEBRANDS_REFRESH";

export const processDeleteBrands = (deletebrandsdetails) => (dispatch) => {
  
  dispatch({
    type: DELETEBRANDS_PROCESSNG,
    payload: null
  });
  console.log("Process deletebrands Dispatch Called");
  const hit = fetch(baseUrl + 'brands/delete_brand',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(deletebrandsdetails)
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
    console.log("dispatching deletebrands processed");
    dispatch({
        type: DELETEBRANDS_PROCESSED,
        payload: responseJson
      });
    })
  .catch((error) => {
    console.log("dispatching deletebrands failed", error);
    dispatch({
        type: DELETEBRANDS_FAILED,
        payload: error.message
      });
  })
  .then(() => {
    console.log("dispatching update_brand refreshed");
    dispatch({
        type: DELETEBRANDS_REFRESH,
        payload: null
      });
  });
  return hit;
}
