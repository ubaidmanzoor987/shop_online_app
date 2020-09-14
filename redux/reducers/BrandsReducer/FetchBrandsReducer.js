import { FETCHBRANDS_PROCESSED, FETCHBRANDS_PROCESSNG, FETCHBRANDS_FAILED } from "../../actions/BrandsActionCreator/FetchBrandsActionCreator";

export const Brands = (state = {
  inProcess: false,
  brands : [],
  msg : null,
},action) => {
  console.log("fetchBrands Reducer called");
  switch(action.type){
    case FETCHBRANDS_PROCESSNG:
      return {...state, inProcess:true , msg:null,brands:[]};
    case FETCHBRANDS_PROCESSED:
      console.log("AddBrand processed Reducer Called");
      return {...state, inProcess:false,
              msg: null,
              brands: action.payload};
    case FETCHBRANDS_FAILED:
      console.log("FETCHBRANDS_FAILED error",action.payload);
      return {...state, inProcess:false,msg:"No Data to Display",brands:null};
    
    default:
      return state;
  }
}
