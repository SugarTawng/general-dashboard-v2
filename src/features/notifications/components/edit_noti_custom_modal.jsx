import {
	Box,
	Button,
	Divider,
	Grid,
	InputAdornment,
	Modal,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import { ConvertDateTime } from "../../../core/utils/core_utils";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PercentIcon from "@mui/icons-material/Percent";
import axios from "axios";
import { accessToken, baseUrl } from "../../../core/constants/constants";
import { useState } from "react";

const EditNotiCustomModal = ({ data, openModal, handleCloseModal }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [status, setStatus] = useState("");

	const handleOnSave = async () => {
		const newNotiData = {
			...data,
			title: title,
			content: content,
			status: status,
			updated_at: new Date().toLocaleString(),
		};

		try {
			await axios
				.put(baseUrl + `/auth/message/${data["id"]}`, newNotiData, {
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
						Notification Details
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
							label="Notification Title"
							defaultValue={data["title"]}
							onChange={(event) => setTitle(event.target.value)}
						/>
					</Grid>
					<Grid item>
						<TextField
							label="Content"
							defaultValue={data["content"]}
							onChange={(event) => setContent(event.target.value)}
						/>
					</Grid>
					<Grid item>
						<TextField
							label="Status"
							defaultValue={data["status"]}
							onChange={(event) => setStatus(event.target.value)}
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

export default EditNotiCustomModal;
