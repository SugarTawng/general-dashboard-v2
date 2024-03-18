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

const CreateNotiCustomModal = ({ openModal, handleCloseModal }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [status, setStatus] = useState("");
	const [projectID, setProjectID] = useState(0);

	const handleOnSave = async () => {
		const newNotiData = {
			id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
			title: title,
			content: content,
			status: status,
			deleted: "false",
			projectID: projectID,
			created_by: 13,
			updated_by: 13,
			created_at: new Date().toLocaleString(),
			updated_at: null,
		};

		try {
			await axios
				.post(baseUrl + `/auth/message`, newNotiData, {
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
						Create New Notification
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
							label="Notification Title"
							onChange={(event) => setTitle(event.target.value)}
						/>
					</Grid>
					<Grid item>
						<TextField
							required
							label="Content"
							onChange={(event) => setContent(event.target.value)}
						/>
					</Grid>
					<Grid item>
						<TextField
							required
							label="Status"
							onChange={(event) => setStatus(event.target.value)}
						/>
					</Grid>
					<Grid item>
						<TextField
							type="number"
							InputProps={{
								inputProps: { min: 0 },
							}}
							required
							label="Project ID"
							onChange={(event) => setProjectID(event.target.value)}
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

export default CreateNotiCustomModal;
