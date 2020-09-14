import { ADDBRANDS_PROCESSED, ADDBRANDS_PROCESSNG, ADDBRANDS_REFRESH , ADDBRANDS_FAILED } from "../../actions/BrandsActionCreator/AddBrandsActionCreator";

export const addBrands = (state = {
  inProcess: false,
  isBrandAdded : null,
  msg : null,
  data : null
},action) => {
  console.log("AddBrand Reducer called");
  switch(action.type){
    case ADDBRANDS_PROCESSNG:
      return {...state, inProcess:true ,isBrandAdded: false, msg:null,data:null};
    case ADDBRANDS_PROCESSED:
      console.log("AddBrand processed Reducer Called");
      isBrandAdded = false;
      console.log("payload", action.payload);
      if(action.payload.status === 0)
      {
        isBrandAdded = true;
      }
      console.log("Is AddBrand added", isBrandAdded);
      return {...state, inProcess:false, isBrandAdded: isBrandAdded,
              msg: action.payload.msg,
              data: action.payload.data};
    case ADDBRANDS_FAILED:
      return {...state, inProcess:false, isBrandAdded: false,msg:action.payload,data:null};
    case ADDBRANDS_REFRESH:
      initstate = {
        inProcess: false,
        isBrandAdded : null,
        msg : null,
        data : null
      };
      return {...state, ...initstate};
    default:
      return state;
  }
}
