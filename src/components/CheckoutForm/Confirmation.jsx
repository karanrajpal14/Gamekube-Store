import React from "react";
import { Link } from "react-router-dom";
import {
	Typography,
	CircularProgress,
	Button,
	Container,
} from "@material-ui/core";

const Confirmation = ({ order }) => {
	return order.customer ? (
		<Container>
			<Typography variant="h5" align="center">
				Thank you for your purchase, {order.customer.firstname}{" "}
				{order.customer.lastname}.
			</Typography>
			<Typography variant="h5" align="center">
				Your order reference is: {order.customer_reference}
			</Typography>
			<Typography variant="h5" align="center">
				We're processing your order right now and have emailed you the
				details.
			</Typography>
			<Button
				style={{ margin: "auto" }}
				variant="outlined"
				component={Link}
				to="/"
			>
				Browse more amazing products
			</Button>
		</Container>
	) : (
		<CircularProgress />
	);
};

export default Confirmation;
