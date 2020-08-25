import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as thunk from 'redux-thunk';
import  logger  from 'redux-logger';
import { login } from "./reducers/loginReducer";
import { signup } from "./reducers/signupReducer";
import { forgetPassword } from "./reducers/forgetPasswordReducer";
//import { products } from "./actions/productsActionCreator";


export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      login,
      signup,
      forgetPassword
    }),
    applyMiddleware(thunk.default,logger)
  );
  return store;
}
