import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Context from "./context/Context";
import { Auth0Provider } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <Auth0Provider
    domain="dev-r258ubrzw5fsp4l1.us.auth0.com"
    clientId="jO3uuSr6sk7YHeinXRNmNWQjpsrktkIK"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}>
    <Context>
      <App />
    </Context>
  </Auth0Provider>,

  document.getElementById("root")
);
