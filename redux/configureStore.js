import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as thunk from 'redux-thunk';
import  logger  from 'redux-logger';
import { login } from "./reducers/loginReducer";
import { signup } from "./reducers/signupReducer";
import { forgetPassword } from "./reducers/forgetPasswordReducer";
import { logout } from "./reducers/logoutReducer";


export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      login,
      signup,
      forgetPassword,
      logout
    }),
    applyMiddleware(thunk.default,logger)
  );
  return store;
}
