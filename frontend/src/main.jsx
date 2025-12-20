import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {store,peristor} from './redux/store.js'
import {Provider} from '@reduxjs/toolkit'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PersistGate persistor={peristor}>

    <Provider store={store}>

    <App />
    </Provider>
    </PersistGate>
  </StrictMode>,
)
