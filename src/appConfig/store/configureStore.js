import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../../reducers/RootReducer';
import InitialState from '../../reducers/InitialState';
import { persistStore, autoRehydrate, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

let middleware = [thunk];

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
  }
  
  const persistedReducer = persistReducer(persistConfig, RootReducer)

export default function configureStore() {

	  let store = createStore(persistedReducer, applyMiddleware(...middleware))
	  let persistor = persistStore(store)
	  return { store, persistor }

	return store;
	// return createStore(
	// 	RootReducer,
	// 	applyMiddleware(...middleware)
	// );
}