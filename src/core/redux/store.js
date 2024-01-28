import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./app_state_slice";

export const store = configureStore({
	reducer: {
		appState: appStateSlice,
	},
});
