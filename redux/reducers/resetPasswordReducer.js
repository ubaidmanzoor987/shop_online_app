import { RESETPASS_REFRESH, RESETPASS_PROCESSNG, RESETPASS_PROCESSED , RESETPASS_FAILED } from "../actions/resetPasswordActionCreator";

export const forgetPassword = (state = {
  inProcess: false,
  status : null,
  msg : null,
  data : null
},action) => {
  console.log("Forget Password Reducer called");
  switch(action.type){
    case RESETPASS_PROCESSNG:
      return {...state, inProcess:true ,status: null, msg:null,data:null};
    case RESETPASS_PROCESSED:
      console.log("Forget Password processed Reducer Called");
      return {...state, inProcess:false, status: action.payload.status,
              msg: action.payload.msg,
              data: action.payload.data};
    case RESETPASS_FAILED:
      return {...state, inProcess:false, status:-1, msg:action.payload,data:null};
    case RESETPASS_REFRESH:
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
