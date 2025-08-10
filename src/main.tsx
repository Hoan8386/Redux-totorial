import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const root = createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>,
)