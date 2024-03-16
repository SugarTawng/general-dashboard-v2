import axios from "axios";
import { Box, Button, Divider, Modal, Stack, Typography } from "@mui/material";
import { Clear } from "@mui/icons-material";
import { accessToken, baseUrl } from "../../../core/constants/constants";

const DeleteProjectCustomModal = ({ data, openModal, handleCloseModal }) => {
	const handleOnDelete = async () => {
		try {
			await axios
				.delete(baseUrl + `/auth/project/${data["id"]}`, {
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

	const handleOnCancel = async () => {
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
						Delete Project?
					</Typography>
					<Button
						variant="text"
						size="large"
						onClick={handleCloseModal}>
						<Clear style={{ color: "#616161" }} />
					</Button>
				</Stack>
				<Divider style={{ background: "black" }} />
				<Typography variant="body2">
					This will delete project <b>{`${data["name"]}`}</b> permanently. You
					cannot undo this action.
				</Typography>
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
						style={{ backgroundColor: "#dc3545" }}
						onClick={handleOnDelete}>
						<Typography
							variant="caption"
							color="#fff">
							Yes, delete
						</Typography>
					</Button>
				</Stack>
			</Box>
		</Modal>
	);
};

export default DeleteProjectCustomModal;
