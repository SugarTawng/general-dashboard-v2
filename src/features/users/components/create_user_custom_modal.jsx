import {
	Box,
	Button,
	Divider,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import axios from "axios";
import { accessToken, baseUrl } from "../../../core/constants/constants";
import { useState } from "react";

const CreateUserCustomModal = ({ openModal, handleCloseModal }) => {
	const [socialID, setSocialID] = useState("");
	const [phone, setPhone] = useState("");
	const [loginName, setLoginName] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [type, setType] = useState("");
	const [phoneVerified, setPhoneVerified] = useState("");
	const [emailVerified, setEmailVerified] = useState("");
	const [socialVerified, setSocialVerified] = useState("");

	const handleOnSave = async () => {
		const newUserData = {
			id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
			social_id: socialID,
			phone: phone,
			login_name: loginName,
			password: password,
			first_name: firstName,
			last_name: lastName,
			display_name: `${firstName} ${lastName}`,
			email: email,
			language: "vi",
			type: type,
			phone_verified: phoneVerified,
			email_verified: emailVerified,
			social_verified: socialVerified,
			activated: "true",
			deleted: "false",
			created_by: 1,
			updated_by: 1,
			created_at: new Date().toLocaleString(),
			updated_at: null,
		};

		try {
			await axios
				.post(baseUrl + `/auth/account`, newUserData, {
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
					maxWidth: "447px",
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
						Create New User
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
							label="Login Name"
							onChange={(event) => setLoginName(event.target.value)}
						/>
					</Grid>
					<Grid item>
						<TextField
							required
							label="Password"
							onChange={(event) => setPassword(event.target.value)}
						/>
					</Grid>
					<Grid item>
						<TextField
							required
							label="First Name"
							onChange={(event) => setFirstName(event.target.value)}
						/>
					</Grid>
					<Grid item>
						<TextField
							required
							label="Last Name"
							onChange={(event) => setLastName(event.target.value)}
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
						<TextField
							required
							label="Email Verify"
							onChange={(event) => setEmailVerified(event.target.value)}
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
							label="Phone Number Verify"
							onChange={(event) => setPhoneVerified(event.target.value)}
						/>
					</Grid>
					<Grid item>
						<TextField
							label="Social Link"
							onChange={(event) => setSocialID(event.target.value)}
						/>
					</Grid>
					<Grid item>
						<TextField
							label="Social Verify Link"
							onChange={(event) => setSocialVerified(event.target.value)}
						/>
					</Grid>
					<Grid item>
						<FormControl sx={{ minWidth: 410 }}>
							<InputLabel>User Type*</InputLabel>
							<Select
								sx={{ height: 44 }}
								value={type}
								label="User Type*"
								onChange={(event) => {
									setType(event.target.value);
								}}>
								<MenuItem value={"super_admin"}>Super Admin</MenuItem>
								<MenuItem value={"admin"}>Admin</MenuItem>
								<MenuItem value={"normal_user"}>Normal User</MenuItem>
							</Select>
						</FormControl>
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

export default CreateUserCustomModal;
