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
import { ConvertDateTime } from "../../../core/utils/core_utils";
import axios from "axios";
import { accessToken, baseUrl } from "../../../core/constants/constants";
import { useState } from "react";

const EditProjectCustomModal = ({ data, openModal, handleCloseModal }) => {
	const [projectName, setProjectName] = useState("");
	const [address, setAddress] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [budget, setBudget] = useState("");

	const handleOnSave = async () => {
		const newProjectData = {
			...data,
			name: projectName,
			address: address,
			email: email,
			phone: phoneNumber,
			budget: budget,
			updated_at: new Date().toLocaleString(),
		};

		try {
			await axios
				.put(baseUrl + `/auth/project/${data["id"]}`, newProjectData, {
					headers: {
						"Content-Type": "application/json",
						access_token: accessToken,
					},
				})
				.then((_) => {
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
						Project Details
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
					<Grid item>
						<TextField
							label="Project Name"
							defaultValue={data["name"]}
							onChange={(event) => setProjectName(event.target.value)}
						/>
					</Grid>

					<Grid item>
						<TextField
							label="Email"
							defaultValue={data["email"]}
							onChange={(event) => setEmail(event.target.value)}
						/>
					</Grid>
					<Grid item>
						<TextField
							label="Phone Number"
							defaultValue={data["phone"]}
							onChange={(event) => setPhoneNumber(event.target.value)}
						/>
					</Grid>
					<Grid item>
						<TextField
							label="Phone Number"
							defaultValue={data["phone"]}
							onChange={(event) => setPhoneNumber(event.target.value)}
						/>
					</Grid>
					<Grid item>
						<TextField
							label="Phone Number"
							defaultValue={data["phone"]}
							onChange={(event) => setPhoneNumber(event.target.value)}
						/>
					</Grid>
				</Grid>
				<Divider style={{ background: "black" }} />
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

export default EditProjectCustomModal;
