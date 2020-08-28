import { LOGOUT_PROCESSED, LOGOUT_PROCESSNG, LOGOUT_REFRESH , LOGOUT_FAILED } from "../actions/logoutActionCreater";

export const logout = (state = {
  inProcess: false,
  isLoggedOut : null,
  msg : null,
  data : null
},action) => {
  console.log("Logout Reducer called");
  switch(action.type){
    case LOGOUT_PROCESSNG:
      return {...state, inProcess:true ,isLoggedOut: false, msg:null,data:null};
    case LOGOUT_PROCESSED:
      console.log("Logout processed Reducer Called");
      isLoggedOut = false;
      console.log("payload", action.payload);
      if(action.payload.status === 0)
      {
        isLoggedOut = true;
      }
      console.log("Is Logged out", isLoggedOut);
      return {...state, inProcess:false, isLoggedOut: isLoggedOut,
              msg: action.payload.msg,
              data: action.payload.data};
    case LOGOUT_FAILED:
      return {...state, inProcess:false, isLoggedOut: false,msg:action.payload,data:null};
    case LOGOUT_REFRESH:
      initstate = {
        inProcess: false,
        isLoggedOut : null,
        msg : null,
        data : null
      };
      return {...state, ...initstate};
    default:
      return state;
  }
}
