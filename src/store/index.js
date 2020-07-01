import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

//Redux-persist migration for application update during prod

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["likedJobs", "jobs"],
};

const persistedReducer = persistReducer(persistConfig, reducers, {});

const storeInfo = () => {
  let store = createStore(persistedReducer, compose(applyMiddleware(thunk)));
  let persisted = persistStore(store);
  return { store, persisted };
};
export default storeInfo;
