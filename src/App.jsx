import { Routes, Route } from "react-router-dom";
import { useMaterialUIController } from "./core/context/context";
import { ThemeProvider } from "@emotion/react";
import LightTheme from "./core/assets/theme";
import DarkTheme from "./core/assets/theme-dark";
import MainLayout from "./core/components/main_layout/main_layout";
import { GenerateRoute } from "./core/routes/app_routes";

const App = () => {
	const [controller, dispatch] = useMaterialUIController();
	const { darkMode } = controller;

	return (
		<ThemeProvider theme={darkMode ? DarkTheme : LightTheme}>
			<Routes>
				<Route
					path="/"
					element={<MainLayout />}>
					{GenerateRoute()}
				</Route>
			</Routes>
		</ThemeProvider>
	);
};

export default App;
