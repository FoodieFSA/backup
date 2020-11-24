import ReactDOM from 'react-dom'
import './Styles/index.css'
import MainApp from './Main'
import * as serviceWorker from './serviceWorker'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './store'
// import Firebase, { FirebaseContext } from './firebase';
import { PersistGate } from 'redux-persist/integration/react'
import history from './history'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history} >
        <MainApp />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
