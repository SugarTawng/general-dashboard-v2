import {
	Box,
	Button,
	Divider,
	Grid,
	InputAdornment,
	InputLabel,
	Modal,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Clear } from "@mui/icons-material";
import axios from "axios";
import { accessToken, baseUrl } from "../../../core/constants/constants";
import { useState } from "react";

const CreateProjectCustomModal = ({ openModal, handleCloseModal }) => {
	const [projectName, setProjectName] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [openAt, setOpenAt] = useState(new Date());
	const [startedDay, setStartedDay] = useState(new Date());
	const [budget, setBudget] = useState(0);

	const handleOnSave = async () => {
		const newProjectData = {
			id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
			name: projectName,
			address: address,
			phone: phone,
			email: email,
			open_at: openAt,
			activated: "true",
			project_progress: 0,
			desc: null,
			deleted: "false",
			started_day: startedDay,
			created_by: 13,
			updated_by: 13,
			created_at: new Date().toLocaleString(),
			updated_at: null,
			budget: budget,
			status: "working",
		};

		try {
			await axios
				.post(baseUrl + `/auth/project`, newProjectData, {
					headers: {
						"Content-Type": "application/json",
						access_token: accessToken,
					},
				})
				.then((value) => {
					handleCloseModal();
				});
		} catch (e) {
			console.log(e);
		}
	};

	const handleOnCancel = () => {
		handleCloseModal();
	};

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
					maxWidth: "450px",
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
						Create New Project
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
					spacing={2}>
					<Grid item>
						<TextField
							required
							label="Project Name"
							onChange={(event) => setProjectName(event.target.value)}
						/>
					</Grid>
					<Grid item>
						<TextField
							required
							label="Address"
							onChange={(event) => setAddress(event.target.value)}
						/>
					</Grid>
					<Grid item>
						<TextField
							required
							label="Phone Number"
							onChange={(event) => setPhone(event.target.value)}
						/>
					</Grid>
					<Grid item>
						<TextField
							required
							label="Email"
							onChange={(event) => setEmail(event.target.value)}
						/>
					</Grid>
					<Grid item>
						<InputLabel>Open At</InputLabel>
						<TextField
							required
							type="date"
							onChange={(event) => setOpenAt(event.target.value)}
						/>
					</Grid>
					<Grid item>
						<InputLabel>Started Day</InputLabel>
						<TextField
							required
							type="date"
							placeholder="Started Day"
							onChange={(event) => setStartedDay(event.target.value)}
						/>
					</Grid>
					<Grid item>
						<TextField
							required
							label="Budget"
							type="number"
							InputProps={{
								inputProps: { min: 0 },
								startAdornment: (
									<InputAdornment position="start">
										<AttachMoneyIcon />
									</InputAdornment>
								),
							}}
							onChange={(event) => setBudget(event.target.value)}
						/>
					</Grid>
				</Grid>
				<Divider style={{ background: "black" }} />
				<Stack
					direction="row"
					justifyContent="flex-end"
					alignItems="center"
					spacing={2}>
					<Button
						variant="text"
						style={{ color: "#6c757d" }}
						onClick={handleOnCancel}>
						Cancel
					</Button>
					<Button
						variant="contained"
						onClick={handleOnSave}>
						<Typography
							variant="caption"
							color="#fff">
							Save
						</Typography>
					</Button>
				</Stack>
			</Box>
		</Modal>
	);
};

export default CreateProjectCustomModal;
