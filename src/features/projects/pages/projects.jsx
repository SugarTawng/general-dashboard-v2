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
import CreateProjectCustomModal from "../components/create_project_custom_modal";
import EditProjectCustomModal from "../components/edit_project_custom_modal";
import DeleteProjectCustomModal from "../components/delete_project_custom_modal";

const Projects = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [projectsData, setProjectsData] = useState([]);
	const [openCreateModal, setOpenCreateModal] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [projectDataForModal, setProjectDataForModal] = useState({});
	const columns = [
		{ id: "name", label: "Name" },
		{ id: "address", label: "Address" },
		{ id: "status", label: "Status" },
		{ id: "budget", label: "Budget" },
		{ id: "project_progress", label: "Progress" },
		{ id: "action", label: "Action" },
	];

	useEffect(() => {
		fetchData();
		getAllProjectsID();
	}, []);

	const fetchData = async () => {
		try {
			const response = await axios.get(baseUrl + "/auth/project", {
				headers: {
					"Content-Type": "application/json",
					access_token: accessToken,
				},
			});

			if (response.data) {
				// Thực hiện map trực tiếp và lưu vào biến userData
				setProjectsData(response.data.data.data.map((data) => ({ ...data })));
			} else {
				// Xử lý khi response không có dữ liệu

				setProjectsData([]); // Đảm bảo userData không bao giờ là null
			}
		} catch (e) {
			// Xử lý lỗi trong quá trình gửi request

			setProjectsData([]); // Đảm bảo userData không bao giờ là null
		}
	};

	const setDeletedForProject = async (isDeleted, projectData) => {
		try {
			await axios.put(
				baseUrl + `/auth/project/${projectData["id"]}`,
				{ ...projectData, deleted: isDeleted },
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

	const handleOpenEditModal = (projectData) => {
		setProjectDataForModal(projectData);
		setOpenEditModal(true);
	};

	const handleCloseEditModal = () => {
		fetchData();
		setOpenEditModal(false);
	};

	const handleOpenDeleteModal = async (projectData) => {
		await setDeletedForProject(true, projectData);
		setProjectDataForModal(projectData);
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
									Add New Project
								</Typography>
							</Button>
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
									{projectsData
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row, index) => (
											<TableRow
												hover
												key={row["id"]}>
												<TableCell>{row["name"]}</TableCell>
												<TableCell>{row["address"]}</TableCell>
												<TableCell>{row["status"]}</TableCell>
												<TableCell>{row["budget"]}</TableCell>
												<TableCell>{`${row["project_progress"]}%`}</TableCell>
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
							count={projectsData.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
						/>
					</Box>
				</Grid>
			</Grid>

			<CreateProjectCustomModal
				openModal={openCreateModal}
				handleCloseModal={handleCloseCreateModal}
			/>
			<EditProjectCustomModal
				data={projectDataForModal}
				openModal={openEditModal}
				handleCloseModal={handleCloseEditModal}
			/>
			<DeleteProjectCustomModal
				data={projectDataForModal}
				openModal={openDeleteModal}
				handleCloseModal={handleCloseDeleteModal}
			/>
		</>
	);
};

export default Projects;
