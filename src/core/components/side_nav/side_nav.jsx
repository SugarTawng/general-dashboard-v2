import {
	Divider,
	Drawer,
	List,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import ColorConfigs from "../../utils/color_configs";
import SizeConfigs from "../../utils/size_configs";
import { AppRoutes } from "../../routes/app_routes";
import SideNavItem from "./side_nav_item";

const SideNav = () => {
	return (
		<Drawer
			variant="permanent"
			sx={{
				width: SizeConfigs.sidenav.width,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: SizeConfigs.sidenav.width,
					boxSizing: "border-box",
					borderRight: "0px",
					backgroundColor: ColorConfigs.sidenav.bg,
					color: ColorConfigs.sidenav.color,
				},
			}}>
			<List disablePadding>
				<Toolbar>
					<Stack
						sx={{ width: "100%" }}
						direction="row"
						justifyContent="center"
						alignItems="center">
						<Typography>Real Estate Dashboard</Typography>
					</Stack>
				</Toolbar>
				<Divider light />
				{AppRoutes.map((route, index) =>
					route.sidebarProps ? (
						<SideNavItem
							item={route}
							key={index}
						/>
					) : null
				)}
			</List>
		</Drawer>
	);
};

export default SideNav;
