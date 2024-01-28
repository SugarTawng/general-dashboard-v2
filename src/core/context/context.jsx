import { createContext, useContext, useReducer, useMemo } from "react";

const MaterialUI = createContext();

function reducer(state, action) {
	switch (action.type) {
		case "MINI_SIDENAV": {
			return { ...state, miniSidenav: action.value };
		}

		case "LAYOUT": {
			return { ...state, layout: action.value };
		}

		case "DARKMODE": {
			return { ...state, darkMode: action.value };
		}

		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}

function MaterialUIControllerProvider({ children }) {
	const initialState = {
		miniSidenav: true,
		layout: "dashboard",
		darkMode: false,
	};

	const [controller, dispatch] = useReducer(reducer, initialState);

	const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

	return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
}

function useMaterialUIController() {
	const context = useContext(MaterialUI);

	if (!context) {
		throw new Error(
			"useMaterialUIController should be used inside the MaterialUIControllerProvider."
		);
	}
	return context;
}

const setMiniSidenav = (dispatch, value) =>
	dispatch({ type: "MINI_SIDENAV", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch, value) => dispatch({ type: "DARKMODE", value });

export {
	MaterialUIControllerProvider,
	useMaterialUIController,
	setMiniSidenav,
	setLayout,
	setDarkMode,
};
