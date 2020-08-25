import { LOGIN_REFRESH, LOGIN_PROCESSNG, LOGIN_PROCESSED , LOGIN_FAILED } from "../actions/loginActionCreator";

export const login = (state = {
  inProcess: false,
  isLoggedIn : null,
  msg : null,
  data : null
},action) => {
  console.log("Login Reducer called");
  switch(action.type){
    case LOGIN_PROCESSNG:
      return {...state, inProcess:true ,isLoggedIn: false, msg:null,data:null};
    case LOGIN_PROCESSED:
      console.log("Login processed Reducer Called");
      isLoggedIn = false;
      console.log("payload", action.payload);
      if(action.payload.status === 0)
      {
        isLoggedIn = true;
      }
      console.log("Is Logged In", isLoggedIn);
      return {...state, inProcess:false, isLoggedIn: isLoggedIn,
              msg: action.payload.msg,
              data: action.payload.data};
    case LOGIN_FAILED:
      return {...state, inProcess:false, isLoggedIn: false,msg:action.payload,data:null};
    case LOGIN_REFRESH:
      initstate = {
        inProcess: false,
        isLoggedIn : null,
        msg : null,
        data : null
      };
      return {...state, ...initstate};
    default:
      return state;
  }
}
