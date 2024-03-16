import { useParams } from "react-router-dom";

const UserDetails = () => {
	const { id } = useParams();
	console.log(id);
	return <div>UserDetails</div>;
};

export default UserDetails;
