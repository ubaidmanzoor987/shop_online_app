import {UPDATEBRANDS_FAILED,UPDATEBRANDS_PROCESSED,UPDATEBRANDS_PROCESSNG,UPDATEBRANDS_REFRESH  } from "../../actions/BrandsActionCreator/UpdateBrandsActionCreator";

export const update_brand = (state = {
  inProcess: false,
  isUpdated : null,
  msg : null,
  data : null
},action) => {
  console.log("UPDATEBRANDS Reducer called", action.type);
  switch(action.type){
    case UPDATEBRANDS_PROCESSNG:
      console.log("UPDATEBRANDS_PROCESSNG  Reducer Called");
      return {...state, inProcess:true ,isUpdated: false, msg:null,data:null};
    case UPDATEBRANDS_PROCESSED:
      console.log("UPDATEBRANDS Processed called", action.payload);
      isUpdated = false;
      if(action.payload.status === 0)
      {
        isUpdated = true;
      }
      return {...state, inProcess:false, isUpdated:isUpdated, msg:action.payload.msg, data:action.payload.data};
    case UPDATEBRANDS_FAILED:
      return {...state, inProcess:false, isUpdated: false,msg:"Update Brand Failed",data:null};
    case UPDATEBRANDS_REFRESH:
      initstate = {
        inProcess: false,
        isUpdated : null,
        msg : null,
        data : null
      };
      return {...state, ...initstate};
    default:
      return state;
  }
}
