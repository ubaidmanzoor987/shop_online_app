import { FRGTPASS_REFRESH, FRGTPASS_PROCESSNG, FRGTPASS_PROCESSED , FRGTPASS_FAILED } from "../actions/forgetPasswordActionCreator";

export const forgetPassword = (state = {
  inProcess: false,
  status : null,
  msg : null,
  data : null
},action) => {
  console.log("Forget Password Reducer called");
  switch(action.type){
    case FRGTPASS_PROCESSNG:
      return {...state, inProcess:true ,status: null, msg:null,data:null};
    case FRGTPASS_PROCESSED:
      console.log("Forget Password processed Reducer Called");
      return {...state, inProcess:false, status: action.payload.status,
              msg: action.payload.msg,
              data: action.payload.data};
    case FRGTPASS_FAILED:
      return {...state, inProcess:false, status:-1, msg:action.payload,data:null};
    case FRGTPASS_REFRESH:
      initstate = {
        inProcess: false,
        status : null,
        msg : null,
        data : null
      };
      return {...state, ...initstate};
    default:
      return state;
  }
}
