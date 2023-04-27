import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import reducer from "./reducer"
import { legacy_createStore as createStore } from "redux"
import { Provider } from "react-redux"
import "./css/styles.css"
const store = createStore(reducer)
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)
