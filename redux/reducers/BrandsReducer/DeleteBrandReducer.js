import {DELETEBRANDS_FAILED,DELETEBRANDS_PROCESSED,DELETEBRANDS_PROCESSNG,DELETEBRANDS_REFRESH  } from "../../actions/BrandsActionCreator/DeleteBrandActionCreator";

export const delete_brand = (state = {
  inProcess: false,
  isDeleted : null,
  msg : null,
  data : null
},action) => {
  console.log("DELETEBRANDS Reducer called", action.type);
  switch(action.type){
    case DELETEBRANDS_PROCESSNG:
      console.log("DELETEBRANDS_PROCESSNG  Reducer Called");
      return {...state, inProcess:true ,isDeleted: false, msg:null,data:null};
    case DELETEBRANDS_PROCESSED:
      console.log("DELETEBRANDS Processed called", action.payload);
      isDeleted = false;
      if(action.payload.status === 0)
      {
        isDeleted = true;
      }
      return {...state, inProcess:false, isDeleted:isDeleted, msg:action.payload.msg, data:action.payload.data};
    case DELETEBRANDS_FAILED:
      return {...state, inProcess:false, isDeleted: false,msg:"Failed To Delete Brand",data:null};
    case DELETEBRANDS_REFRESH:
      initstate = {
        inProcess: false,
        isDeleted : null,
        msg : null,
        data : null
      };
      return {...state, ...initstate};
    default:
      return state;
  }
}
