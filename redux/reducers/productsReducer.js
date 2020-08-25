import * from "../actions/products";

export const products = (state = {
  isLoading: false,
  status: null,
  msg : null,
  data : null
},action) => {
  switch(action.type){
    case PRODUCTS_LOADING:
      return {...state, isLoading:true, status:null, msg:null,data:null};
    case PRODUCTS_LOADED:
      const isLoggedIn = false;
      if(action.payload.status === 0)
      {
        isLoggedIn = true;
      }
      return {...state, isLoading:false, status:action.payload.status,
        msg: action.payload.msg,data:action.payload,data};
    case PRODUCTS_FAILED:
      return {...state, isLoading: false, status: -1,
        msg: "Network Connection Error", data: null};
    default:
      return state;
  }
}
