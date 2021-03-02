import React from "react";
import {
	Typography,
	List,
	ListItem,
	ListItemText,
	Divider,
	Container,
} from "@material-ui/core";

const Review = ({ checkoutToken, shippingData, shipping, total }) => {
	return (
		<>
			<Typography variant="h6" gutterBottom>
				Order Summary
			</Typography>
			<List disablePadding>
				{checkoutToken.live.line_items.map((product) => (
					<ListItem key={product.name}>
						<ListItemText
							primary={product.name}
							secondary={`Quantity: ${product.quantity}`}
						/>
						<Typography variant="body2">
							{product.line_total.formatted_with_symbol}
						</Typography>
					</ListItem>
				))}
				<ListItem style={{ fontWeight: 900 }}>
					<ListItemText primary="Subtotal" />
					<Typography variant="subtitle1">
						{checkoutToken.live.subtotal.formatted_with_symbol}
					</Typography>
				</ListItem>
				<ListItem style={{ fontWeight: 900 }}>
					<ListItemText primary="Shipping" />
					<Typography variant="subtitle1">
						{shipping}
					</Typography>
				</ListItem>
				<ListItem style={{ fontWeight: 900 }}>
					<ListItemText primary="Total" />
					<Typography variant="subtitle1">
						{total}
					</Typography>
				</ListItem>
			</List>
			<Divider />
			<Typography variant="h6" gutterBottom style={{ margin: "1em 0" }}>
				Shipping Information
			</Typography>
			<Container>
				<Typography>
					{shippingData?.firstName} {shippingData?.lastName}
				</Typography>
				<Typography>
					{shippingData?.address1} {shippingData?.address2}
				</Typography>
				<Typography>
					{shippingData?.shippingCountry}-
					{shippingData?.shippingDistrict} {shippingData?.zip}
				</Typography>
			</Container>
		</>
	);
};

export default Review;
