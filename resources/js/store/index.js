import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// reducers
import userReducer from './reducer/userReducer'
import workoutLogReducer from './reducer/workoutlogReducer'

const persistConfig = {
  key: 'root',
  storage
}
const rootReducer = combineReducers({ userReducer, workoutLogReducer })
const persistedReducer = persistReducer(persistConfig, rootReducer)
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)

const store = createStore(persistedReducer, middleware)
const persistor = persistStore(store)
export { store, persistor }

// export default store
export * from './reducer/userReducer'
export * from './reducer/workoutlogReducer'
