import { Route } from "react-router-dom";
import PageWrapper from "../components/page_wrapper/page_wrapper";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import Dashboard from "../../features/dashboard/dashboard";
import Users from "../../features/users/users";
import Projects from "../../features/projects/projects";
import Notifications from "../../features/notifications/notifications";
import SignIn from "../../features/auth/sign_in/sign_in";
import SignUp from "../../features/auth/sign_up/sign_up";
import UserDetails from "../../features/users/user_details";

export const AppRoutes = [
	{
		path: "/dashboard",
		element: <Dashboard />,
		state: "dashboard",
		sidebarProps: {
			displayText: "Dashboard",
			icon: <DashboardOutlinedIcon />,
		},
	},
	{
		path: "/users",
		element: <Users />,
		state: "user",
		sidebarProps: {
			displayText: "Users",
			icon: <PeopleOutlinedIcon />,
		},
	},
	{
		path: "/users/:id",
		element: <UserDetails />,
		state: "users.id",
	},
	{
		path: "/projects",
		element: <Projects />,
		state: "projects",
		sidebarProps: {
			displayText: "Projects",
			icon: <MapsHomeWorkOutlinedIcon />,
		},
	},
	{
		path: "/notifications",
		element: <Notifications />,
		state: "notifications",
		sidebarProps: {
			displayText: "Notification",
			icon: <NotificationsNoneOutlinedIcon />,
		},
	},
	{
		path: "/sign-in",
		element: <SignIn />,
		state: "sign-in",
		sidebarProps: {
			displayText: "Sign In",
			icon: <LoginOutlinedIcon />,
		},
	},
	{
		path: "/sign-up",
		element: <SignUp />,
		state: "sign-up",
		sidebarProps: {
			displayText: "Sign Up",
			icon: <PersonAddOutlinedIcon />,
		},
	},
];

export const GenerateRoute = () => {
	return AppRoutes.map((route, index) => (
		<Route
			index
			path={route.path}
			element={<PageWrapper state={route.state}>{route.element}</PageWrapper>}
			key={index}
		/>
	));
};
