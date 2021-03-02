import React from "react";
import { Typography, List, ListItem, ListItemText, Divider } from "@material-ui/core";

const Review = ({ checkoutToken, shippingData }) => {
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
					<ListItemText primary="Total" />
					<Typography variant="subtitle1">
						{checkoutToken.live.subtotal.formatted_with_symbol}
					</Typography>
				</ListItem>
			</List>
		</>
	);
};

export default Review;
