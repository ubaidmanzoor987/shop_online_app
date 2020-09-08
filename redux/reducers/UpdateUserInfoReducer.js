import {UPDATE_FAILED,UPDATE_PROCESSED,UPDATE_PROCESSNG,UPDATE_REFRESH  } from "../actions/UpdateUserInfoActionCreator";

export const update_user_info = (state = {
  inProcess: false,
  isUpdated : null,
  msg : null,
  data : null
},action) => {
  console.log("update_user_info Reducer called", action.type);
  switch(action.type){
    case UPDATE_PROCESSNG:
      console.log("UPDATE_PROCESSNG  Reducer Called");
      return {...state, inProcess:true ,isUpdated: false, msg:null,data:null};
    case UPDATE_PROCESSED:
      console.log("UPDATE Processed called", action.payload);
      isUpdated = false;
      if(action.payload.status === 0)
      {
        isUpdated = true;
      }
      return {...state, inProcess:false, isUpdated:isUpdated, msg:action.payload.msg,data: action.payload.data};
    case UPDATE_FAILED:
      return {...state, inProcess:false, isUpdated: false,msg:"Update Failed",data:null};
    case UPDATE_REFRESH:
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
