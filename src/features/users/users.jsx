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
} from "@mui/material";
import { Info, DeleteForever } from "@mui/icons-material";
import { baseUrl, accessToken } from "../../core/constants/constants";
import EditUserCustomModal from "../../core/components/custom_modal/edit_user_custom_modal";
import DeleteUserCustomModal from "../../core/components/custom_modal/delete_user_custom_modal";
import CreateUserCustomModal from "../../core/components/custom_modal/create_user_custom_modal";

const Users = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [usersData, setUsersData] = useState([]);
	const [openCreateModal, setOpenCreateModal] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [userDataForModal, setUserDataForModal] = useState({});
	const columns = [
		{ id: "name", label: "Name" },
		{ id: "role", label: "Role" },
		{ id: "status", label: "Status" },
		{ id: "action", label: "Action" },
	];

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await axios.get(baseUrl + "/auth/account", {
				headers: {
					"Content-Type": "application/json",
					access_token: accessToken,
				},
			});
			if (response.data) {
				// Thực hiện map trực tiếp và lưu vào biến userData
				setUsersData(response.data.data.map((data) => ({ ...data })));
			} else {
				// Xử lý khi response không có dữ liệu
				setUsersData([]); // Đảm bảo userData không bao giờ là null
			}
		} catch (e) {
			// Xử lý lỗi trong quá trình gửi request
			setUsersData([]); // Đảm bảo userData không bao giờ là null
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
		setOpenCreateModal(false);
	};

	const handleOpenEditModal = (userData) => {
		setUserDataForModal(userData);
		setOpenEditModal(true);
	};

	const handleCloseEditModal = () => {
		fetchData();
		setOpenEditModal(false);
	};

	const handleOpenDeleteModal = (userData) => {
		setUserDataForModal(userData);
		setOpenDeleteModal(true);
	};

	const handleCloseDeleteModal = () => {
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
									Add New User
								</Typography>
							</Button>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25, 100]}
								component="div"
								count={usersData.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
							/>
						</Stack>
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										{columns.map((column) => (
											<TableCell key={column.id}>{column.label}</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{usersData
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row, index) => {
											return (
												<>
													<TableRow
														hover
														tabIndex={-1}
														key={row["id"]}>
														<TableCell key={row["id"]}>
															{`${row["first_name"]} ${row["last_name"]}`}
														</TableCell>
														<TableCell key={row["id"]}>{row["type"]}</TableCell>
														<TableCell key={row["id"]}>
															{row["activated"]}
														</TableCell>
														<TableCell key={row["id"]}>
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
												</>
											);
										})}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25, 100]}
							component="div"
							count={usersData.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Box>
				</Grid>
			</Grid>
			<CreateUserCustomModal
				openModal={openCreateModal}
				handleCloseModal={handleCloseCreateModal}
			/>
			<EditUserCustomModal
				data={userDataForModal}
				openModal={openEditModal}
				handleCloseModal={handleCloseEditModal}
			/>
			<DeleteUserCustomModal
				data={userDataForModal}
				openModal={openDeleteModal}
				handleCloseModal={handleCloseDeleteModal}
			/>
		</>
	);
};

export default Users;
