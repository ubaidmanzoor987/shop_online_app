import { UPDATE_REFRESH, UPDATE_PROCESSNG, UPDATE_PROCESSED , UPDATE_FAILED } from "../actions/UpdatePasswordActionCreator";

export const UpdatePassword = (state = {
  inProcess: false,
  isUpdated : null,
  msg : null,
  data : null
},action) => {
  console.log("Update Password Reducer called");
  switch(action.type){
    case UPDATE_PROCESSNG:
      return {...state, inProcess:true ,isUpdated: null, msg:null,data:null};
    case UPDATE_PROCESSED:
      console.log("Update Psasword processed Reducer Called");
      isUpdated = false;
      console.log("payload", action.payload);
      if(action.payload.status === 0)
      {
        isUpdated = true;
      }
      console.log("Is isUpdated ", isUpdated);
      return {...state, inProcess:false, isUpdated: isUpdated,
              msg: action.payload.msg,
              data: action.payload.data};
    case UPDATE_FAILED:
      return {...state, inProcess:false, isUpdated:false, msg:action.payload,data:null};
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
