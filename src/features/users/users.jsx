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
} from "@mui/material";
import { Info, DeleteForever } from "@mui/icons-material";
import { baseUrl, accessToken } from "../../core/constants/constants";
import UserCustomModal from "../../core/components/custom_modal/user_custom_modal";

const Users = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [usersData, setUsersData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [userDataForModal, setUserDataForModal] = useState({});
  const columns = [
    { id: "name", label: "Name" },
    { id: "role", label: "Role" },
    { id: "status", label: "Status" },
    { id: "action", label: "Action" },
  ];

  useEffect(() => {
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
          console.log(response.data);
          setUsersData(response.data.data.map((data) => ({ ...data })));
        } else {
          // Xử lý khi response không có dữ liệu
          setUsersData([]); // Đảm bảo userData không bao giờ là null
        }
      } catch (error) {
        // Xử lý lỗi trong quá trình gửi request
        setUsersData([]); // Đảm bảo userData không bao giờ là null
      }
    };
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenModal = (userData) => {
    setUserDataForModal(userData);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box pt={3}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={usersData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
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
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            <TableCell key={index}>{index}</TableCell>
                            <TableCell key={index}>
                              {`${row["first_name"]} ${row["last_name"]}`}
                            </TableCell>
                            <TableCell key={index}>{row["type"]}</TableCell>
                            <TableCell key={index}>
                              {row["activated"]}
                            </TableCell>
                            <TableCell key={index}>
                              <Stack direction="row" spacing={2}>
                                <Button
                                  variant="text"
                                  size="large"
                                  onClick={() => handleOpenModal(row)}
                                >
                                  <Info style={{ color: "#616161" }} />
                                </Button>
                                <Button
                                  variant="text"
                                  size="large"
                                  onClick={() => {
                                    alert("clicked");
                                  }}
                                >
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
              rowsPerPageOptions={[10, 25, 100]}
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
      <UserCustomModal
        data={userDataForModal}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default Users;
