import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { MaterialUIControllerProvider } from "./core/context/context.jsx";
import { Provider } from "react-redux";
import { store } from "./core/redux/store.js";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<CssBaseline />
		<BrowserRouter>
			<MaterialUIControllerProvider>
				<App />
			</MaterialUIControllerProvider>
		</BrowserRouter>
	</Provider>
);
