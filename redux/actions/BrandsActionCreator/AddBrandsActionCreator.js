import { baseUrl } from "../../../shared/ServerConf";

export const ADDBRANDS_PROCESSNG = "ADDBRANDS_PROCESSING";
export const ADDBRANDS_PROCESSED = "ADDBRANDS_PROCESSED";
export const ADDBRANDS_FAILED = "ADDBRANDS_FAILED";
export const ADDBRANDS_REFRESH = "ADDBRANDS_REFRESH";

export const processAddBrands = (addbrandsdetails) => (dispatch) => {
  
  dispatch({
    type: ADDBRANDS_PROCESSNG,
    payload: null
  });
  console.log("Process addbrand Dispatch Called");
  const hit = fetch(baseUrl + 'brands/insert_brands',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(addbrandsdetails)
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
    console.log("dispatching addbrands processed");
    dispatch({
        type: ADDBRANDS_PROCESSED,
        payload: responseJson
      });
    })
  .catch((error) => {
    console.log("dispatching addbrands failed", error);
    dispatch({
        type: ADDBRANDS_FAILED,
        payload: error.message
      });
  })
  .then(() => {
    console.log("dispatching addbrands refreshed");
    dispatch({
        type: ADDBRANDS_REFRESH,
        payload: null
      });
  });
  return hit;
}
