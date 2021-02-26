import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";
import useStyles from "./styles";

const Cart = ({
	cart,
	handleUpdateCart,
	handleRemoveFromCart,
	handleEmptyCart,
}) => {
	const classes = useStyles();
	const isEmpty = !cart?.line_items?.length;

	const EmptyCart = () => (
		<Typography variant="subtitle1">
			Your cart is empty.
			<Link to="/" className={classes.link}>
				Please add some items and come back.
			</Link>
		</Typography>
	);

	const FilledCart = () => (
		<>
			<Grid container spacing={3}>
				{cart.line_items.map((item) => (
					<Grid item xs={12} sm={4} key={item.id}>
						<CartItem
							item={item}
							handleUpdateCart={handleUpdateCart}
							handleRemoveFromCart={handleRemoveFromCart}
						/>
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
						onClick={handleEmptyCart}
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
