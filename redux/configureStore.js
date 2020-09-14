import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as thunk from 'redux-thunk';
import  logger  from 'redux-logger';
import { login } from "./reducers/loginReducer";
import { signup } from "./reducers/signupReducer";
import { UpdatePassword } from "./reducers/UpdatePasswordReducer";
import { logout } from "./reducers/logoutReducer";
import {update_user_info} from "./reducers/UpdateUserInfoReducer";
import { reducer as formReducer } from 'redux-form';
import {addBrands} from './reducers/BrandsReducer/AddBrandsReducer';
import {Brands} from './reducers/BrandsReducer/FetchBrandsReducer';
import {update_brand} from './reducers/BrandsReducer/UpdateBrandsReducer';
import {delete_brand} from './reducers/BrandsReducer/DeleteBrandReducer';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      login,
      signup,
      UpdatePassword,
      logout,
      form: formReducer,
      update_user_info,
      addBrands,
      Brands,
      update_brand,
      delete_brand
    }),
    applyMiddleware(thunk.default,logger)
  );
  return store;
}
