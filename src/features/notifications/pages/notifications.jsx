import axios from "axios";
import { useEffect, useState } from "react";
import {
	Box,
	Button,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Stack,
	Typography,
	Paper,
	TableFooter,
} from "@mui/material";
import { Info, DeleteForever } from "@mui/icons-material";
import { baseUrl, accessToken } from "../../../core/constants/constants";
import CreateNotiCustomModal from "../components/create_noti_custom_modal";
import EditNotiCustomModal from "../components/edit_noti_custom_modal";
import DeleteNotiCustomModal from "../components/delete_noti_custom_modal";

const Notifications = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [notisData, setNotisData] = useState([]);
	const [openCreateModal, setOpenCreateModal] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [notiDataForModal, setNotiDataForModal] = useState({});
	const columns = [
		{ id: "title", label: "Title" },
		{ id: "content", label: "Content" },
		{ id: "status", label: "Status" },
		{ id: "action", label: "Action" },
	];

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await axios.get(baseUrl + "/auth/message", {
				headers: {
					"Content-Type": "application/json",
					access_token: accessToken,
				},
			});

			if (response.data) {
				// Thực hiện map trực tiếp và lưu vào biến userData
				setNotisData(response.data.data.data.map((data) => ({ ...data })));
			} else {
				// Xử lý khi response không có dữ liệu

				setNotisData([]); // Đảm bảo userData không bao giờ là null
			}
		} catch (e) {
			// Xử lý lỗi trong quá trình gửi request

			setNotisData([]); // Đảm bảo userData không bao giờ là null
		}
	};

	const setDeletedForNoti = async (isDeleted, notiData) => {
		try {
			await axios.put(
				baseUrl + `/auth/message/${projectData["id"]}`,
				{ ...notiData, deleted: isDeleted },
				{
					headers: {
						"Content-Type": "application/json",
						access_token: accessToken,
					},
				}
			);
		} catch (e) {
			console.log(e);
		}
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const handleOpenCreateModal = () => {
		setOpenCreateModal(true);
	};

	const handleCloseCreateModal = () => {
		fetchData();
		setOpenCreateModal(false);
	};

	const handleOpenEditModal = (notiData) => {
		setNotiDataForModal(notiData);
		setOpenEditModal(true);
	};

	const handleCloseEditModal = () => {
		fetchData();
		setOpenEditModal(false);
	};

	const handleOpenDeleteModal = async (notiData) => {
		await setDeletedForNoti(true, notiData);
		setNotiDataForModal(notiData);
		setOpenDeleteModal(true);
	};

	const handleCloseDeleteModal = async () => {
		fetchData();
		setOpenDeleteModal(false);
	};

	return (
		<>
			<Grid
				container
				spacing={6}>
				<Grid
					item
					xs={12}>
					<Box pt={3}>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							marginBottom="10px">
							<Button
								onClick={handleOpenCreateModal}
								variant="contained"
								size="medium">
								<Typography
									variant="caption"
									color="#fff">
									Add New Notification
								</Typography>
							</Button>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25, 100]}
								count={notisData.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
							/>
						</Stack>

						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										{columns.map((column) => (
											<TableCell
												align="right"
												key={column.id}>
												{column.label}
											</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{notisData
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row, index) => (
											<TableRow
												hover
												key={row["id"]}>
												<TableCell>{row["title"]}</TableCell>
												<TableCell>{row["content"]}</TableCell>
												<TableCell>{row["status"]}</TableCell>
												<TableCell>
													<Stack
														direction="row"
														spacing={2}>
														<Button
															variant="text"
															size="large"
															onClick={() => handleOpenEditModal(row)}>
															<Info style={{ color: "#616161" }} />
														</Button>
														<Button
															variant="text"
															size="large"
															onClick={() => handleOpenDeleteModal(row)}>
															<DeleteForever style={{ color: "#f44336" }} />
														</Button>
													</Stack>
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							component="div"
							rowsPerPageOptions={[5, 10, 25, 100]}
							count={notisData.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Box>
				</Grid>
			</Grid>

			<CreateNotiCustomModal
				openModal={openCreateModal}
				handleCloseModal={handleCloseCreateModal}
			/>
			<EditNotiCustomModal
				data={notiDataForModal}
				openModal={openEditModal}
				handleCloseModal={handleCloseEditModal}
			/>
			<DeleteNotiCustomModal
				data={notiDataForModal}
				openModal={openDeleteModal}
				handleCloseModal={handleCloseDeleteModal}
			/>
		</>
	);
};

export default Notifications;
