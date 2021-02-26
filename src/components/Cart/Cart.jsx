import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import CartItem from "./CartItem/CartItem";
import useStyles from "./styles";

const Cart = ({ cart }) => {
	const classes = useStyles();
	const isEmpty = !cart?.line_items?.length;

	const EmptyCart = () => (
		<Typography variant="subtitle1">
			Your cart is empty. Please add some items and come back.
		</Typography>
	);

	const FilledCart = () => (
		<>
			<Grid container spacing={3}>
				{cart.line_items.map((item) => (
					<Grid item xs={12} sm={4} key={item.id}>
						<CartItem item={item} />
					</Grid>
				))}
			</Grid>
			<div className={classes.cardDetails}>
				<Typography variant="h4">
					Subtotal: {cart.subtotal.formatted_with_symbol}
				</Typography>
				<div>
					<Button
						className={classes.emptyButton}
						size="large"
						type="button"
						variant="contained"
						color="secondary"
					>
						Empty Cart
					</Button>
					<Button
						className={classes.checkoutButton}
						size="large"
						type="button"
						variant="contained"
						color="primary"
					>
						Checkout
					</Button>
				</div>
			</div>
		</>
	);

	return (
		<Container>
			<div className={classes.toolbar}>
				<Typography gutterBottom className={classes.title} variant="h3">
					Your Shopping Cart
				</Typography>
				{isEmpty ? <EmptyCart /> : <FilledCart />}
			</div>
		</Container>
	);
};

export default Cart;
