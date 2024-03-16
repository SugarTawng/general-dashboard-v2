import { Box, Grid } from "@mui/material";
import { accessToken, baseUrl } from "../../core/constants/constants";
import { useEffect, useState } from "react";
import StatisticsCard from "../../core/components/statistics_card/statistics_card";
import axios from "axios";

const Dashboard = () => {
	const [bookingData, setBookingData] = useState(null);
	const [accountData, setAccountData] = useState(null);
	const [revenueData, setRevenueData] = useState(null);
	const [roomData, setRoomData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					baseUrl + "/auth/dashboard/getStatistic",
					{
						headers: {
							"Content-Type": "application/json",
							access_token: accessToken,
						},
					}
				);
				if (response.data) {
					setBookingData(response.data.data.resultBooking);
					setAccountData(response.data.data.resultAccount);
					setRevenueData(response.data.data.resultMoney);
					setRoomData(response.data.data.resultRoom);
				}
			} catch (e) {
				console.error(e);
			}
		};
		fetchData();
	}, []);

	if (!bookingData || !accountData || !revenueData || !roomData) {
		<div>loading</div>;
	}

	return (
		<Box
			sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
				p: 3,
				position: "relative",
				[breakpoints.up("xl")]: {
					transition: transitions.create(["margin-left", "margin-right"], {
						easing: transitions.easing.easeInOut,
						duration: transitions.duration.standard,
					}),
				},
			})}>
			<Box py={3}>
				<Grid
					container
					spacing={3}>
					<Grid
						item
						xs={12}
						md={6}
						lg={3}>
						<Box mb={1.5}>
							<StatisticsCard
								color="dark"
								icon="weekend"
								title="Bookings"
								count={bookingData || 0}
								percentage={{
									color: "success",
									amount: "+55%",
									label: "than lask week",
								}}
							/>
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
						lg={3}>
						<Box mb={1.5}>
							<StatisticsCard
								icon="person_add"
								title="Monthly User"
								count={accountData || 0}
								percentage={{
									color: "success",
									amount: "+3%",
									label: "than last month",
								}}
							/>
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
						lg={3}>
						<Box mb={1.5}>
							<StatisticsCard
								color="success"
								icon="store"
								title="Revenue"
								count={revenueData || 0}
								percentage={{
									color: "success",
									amount: "+1%",
									label: "than yesterday",
								}}
							/>
						</Box>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}
						lg={3}>
						<Box mb={1.5}>
							<StatisticsCard
								color="primary"
								icon="leaderboard"
								title="Empty rooms"
								count={roomData || 0}
								percentage={{
									color: "success",
									amount: "",
									label: "Just updated",
								}}
							/>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

export default Dashboard;
