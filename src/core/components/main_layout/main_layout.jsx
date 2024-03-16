import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import ColorConfigs from "../../utils/color_configs";
import SizeConfigs from "../../utils/size_configs";
import SideNav from "../side_nav/side_nav";
import Topbar from "../top_bar/top_bar";

const MainLayout = () => {
	return (
		<Box sx={{ display: "flex" }}>
			<Box
				component="nav"
				sx={{
					width: SizeConfigs.sidenav.width,
					flexShrink: 0,
				}}>
				<SideNav />
			</Box>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					width: `calc(100% - ${SizeConfigs.sidenav.width})`,
					minHeight: "100vh",
					backgroundColor: ColorConfigs.mainBg,
				}}>
				<Toolbar />
				<Outlet />
			</Box>
		</Box>
	);
};

export default MainLayout;
