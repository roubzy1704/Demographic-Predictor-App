import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import ErrorBoundary from "./containers/ErrorBoundary";

ReactDOM.render(
	<React.StrictMode>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</React.StrictMode>,
	document.getElementById("root")
);
