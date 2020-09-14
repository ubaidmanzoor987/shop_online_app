import { baseUrl } from "../../../shared/ServerConf";

export const FETCHBRANDS_PROCESSNG = "FETCHBRANDS_PROCESSING";
export const FETCHBRANDS_PROCESSED = "FETCHBRANDS_PROCESSED";
export const FETCHBRANDS_FAILED = "FETCHBRANDS_FAILED";

export const fetchBrands = (fetchBrandsDetail) => (dispatch) => {
  
  dispatch({
    type: FETCHBRANDS_PROCESSNG,
    payload: null
  });
  console.log("Process FETCHBRANDS Dispatch Called");
  const hit = fetch(baseUrl + 'brands/list_brands',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fetchBrandsDetail)
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
    console.log("dispatching fetchbrands processed");
    dispatch({
        type: FETCHBRANDS_PROCESSED,
        payload: responseJson
      });
    })
  .catch((error) => {
    console.log("dispatching fetchbrands failed", error);
    dispatch({
        type: FETCHBRANDS_FAILED,
        payload: error.message
      });
  })
  
  return hit;
}
