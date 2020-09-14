import { baseUrl } from "../../../shared/ServerConf";

export const UPDATEBRANDS_PROCESSNG = "UPDATEBRANDS_PROCESSING";
export const UPDATEBRANDS_PROCESSED = "UPDATEBRANDS_PROCESSED";
export const UPDATEBRANDS_FAILED = "UPDATEBRANDS_FAILED";
export const UPDATEBRANDS_REFRESH = "UPDATEBRANDS_REFRESH";

export const processUpdateBrands = (updatebrandsdetails) => (dispatch) => {
  
  dispatch({
    type: UPDATEBRANDS_PROCESSNG,
    payload: null
  });
  console.log("Process updatebrands Dispatch Called");
  const hit = fetch(baseUrl + 'brands/update_brand',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatebrandsdetails)
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
    console.log("dispatching update_brand processed");
    dispatch({
        type: UPDATEBRANDS_PROCESSED,
        payload: responseJson
      });
    })
  .catch((error) => {
    console.log("dispatching update_brand failed", error);
    dispatch({
        type: UPDATEBRANDS_FAILED,
        payload: error.message
      });
  })
  .then(() => {
    console.log("dispatching update_brand refreshed");
    dispatch({
        type: UPDATEBRANDS_REFRESH,
        payload: null
      });
  });
  return hit;
}
