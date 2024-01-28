import { AppBar, Toolbar, Typography } from "@mui/material";
import ColorConfigs from "../../utils/color_configs";
import SizeConfigs from "../../utils/size_configs";

const TopBar = () => {
	return (
		<AppBar
			position="fixed"
			sx={{
				width: `calc(100% - ${SizeConfigs.sidenav.width})`,
				ml: SizeConfigs.sidenav.width,
				boxShadow: "unset",
				backgroundColor: ColorConfigs.topbar.bg,
				color: ColorConfigs.topbar.color,
			}}>
			<Toolbar sx={{ ml: 4 }}>
				<Typography variant="h6"></Typography>
			</Toolbar>
		</AppBar>
	);
};

export default TopBar;
