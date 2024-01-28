import {
	Box,
	Button,
	Divider,
	Grid,
	Modal,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import { ConvertDateTime } from "../../utils/core_utils";

const CustomModal = ({ data, openModal, handleCloseModal }) => {
	console.log(data);
	return (
		<Modal
			open={openModal}
			onClose={handleCloseModal}>
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: "max-width",
					bgcolor: "background.paper",
					boxShadow: 20,
					pt: 2,
					px: 2,
					pb: 3,
				}}>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center">
					<Typography
						variant="h4"
						component="h2">
						User Details
					</Typography>
					<Button
						variant="text"
						size="large"
						onClick={handleCloseModal}>
						<Clear style={{ color: "#616161" }} />
					</Button>
				</Stack>
				<Divider style={{ background: "black" }} />
				<Grid
					container
					spacing={1}>
					<Grid
						item
						spacing={3}>
						<TextField
							label="First Name"
							value={data["first_name"]}
							InputProps={{
								readOnly: true,
							}}
						/>
					</Grid>
					<Grid
						item
						spacing={3}>
						<TextField
							label="Last Name"
							value={data["last_name"]}
							InputProps={{
								readOnly: true,
							}}
						/>
					</Grid>
					<Grid
						item
						spacing={3}>
						<TextField
							label="Email"
							value={data["email"]}
							InputProps={{
								readOnly: true,
							}}
						/>
					</Grid>
					<Grid
						item
						spacing={3}>
						<TextField
							label="Phone Number"
							value={data["phone"]}
							InputProps={{
								readOnly: true,
							}}
						/>
					</Grid>
				</Grid>
				<Divider
					style={{ background: "black" }}
					light
				/>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center">
					<p>
						<b>Created At: </b> {ConvertDateTime(data["created_at"])}
					</p>

					<p>
						<b>Updated At: </b>
						{ConvertDateTime(data["updated_at"])}
					</p>
				</Stack>
			</Box>
		</Modal>
	);
};

export default CustomModal;
