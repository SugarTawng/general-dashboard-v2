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

const EditUserCustomModal = ({ data, openModal, handleCloseModal }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	const handleOnSave = async () => {
		const newUserData = {
			...data,
			first_name: firstName,
			last_name: lastName,
			email: email,
			phone: phoneNumber,
			updated_at: new Date().toLocaleString(),
		};

		try {
			await axios
				.put(baseUrl + `/auth/account/${data["id"]}`, newUserData, {
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
					<Grid item>
						<TextField
							label="First Name"
							defaultValue={data["first_name"]}
							onChange={(event) => setFirstName(event.target.value)}
						/>
					</Grid>
					<Grid item>
						<TextField
							label="Last Name"
							defaultValue={data["last_name"]}
							onChange={(event) => setLastName(event.target.value)}
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

export default EditUserCustomModal;
