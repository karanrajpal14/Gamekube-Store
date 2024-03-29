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
		<Container>
			<Typography variant="h4">Your cart is empty</Typography>
			<Typography variant="h4">Please browse our store to add some and return</Typography>
			<Button component={Link} to="/" variant="outlined">
				Browse store
			</Button>
		</Container>
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
			<div className={classes.cartDetails}>
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
						component={Link}
						to="/checkout"
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
				<Typography gutterBottom className={classes.title} variant="h2">
					Cart
				</Typography>
				{isEmpty ? <EmptyCart /> : <FilledCart />}
			</div>
		</Container>
	);
};

export default Cart;
