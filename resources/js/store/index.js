import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// reducers
import user from './user'
import workoutLog from './workoutLog'

const persistConfig = {
  key: 'root',
  storage
}
const rootReducer = combineReducers({ user, workoutLog })
const persistedReducer = persistReducer(persistConfig, rootReducer)
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)

const store = createStore(persistedReducer, middleware)
const persistor = persistStore(store)
export { store, persistor }

// export default store
export * from './user'
export * from './workoutLog'
