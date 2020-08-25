import { SIGNUP_PROCESSNG, SIGNUP_PROCESSED, SIGNUP_FAILED, SIGNUP_REFRESH } from "../actions/signupActionCreator";

export const signup = (state = {
  inProcess: false,
  isSignedUp : null,
  msg : null,
  data : null
},action) => {
  console.log("Sign Up Reducer called", action.type);
  switch(action.type){
    case SIGNUP_PROCESSNG:
      console.log("Sign Up Processing Reducer Called");
      return {...state, inProcess:true ,isSignedUp: false, msg:null,data:null};
    case SIGNUP_PROCESSED:
      console.log("Sign Up Processed", action.payload);
      isSignedUp = false;
      if(action.payload.status === 0)
      {
        isSignedUp = true;
      }
      return {...state, inProcess:false, isSignedUp:isSignedUp, msg:action.payload.msg,data: action.payload.data};
    case SIGNUP_FAILED:
      return {...state, inProcess:false, isSignedUp: false,msg:"Sign Up Failed",data:null};
    case SIGNUP_REFRESH:
      initstate = {
        inProcess: false,
        isSignedUp : null,
        msg : null,
        data : null
      };
      return {...state, ...initstate};
    default:
      return state;
  }
}
