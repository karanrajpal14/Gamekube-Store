import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	IconButton,
	Badge,
	Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";

const Navbar = ({ cartCount }) => {
	const classes = useStyles();
	const location = useLocation();
	const isInCart = location.pathname !== "/cart";

	const CartButton = () => (
		<IconButton
			className={classes.button}
			aria-label="Show cart items"
			color="inherit"
			component={Link}
			to="/cart"
		>
			<Badge badgeContent={cartCount} color="secondary">
				<ShoppingCart />
			</Badge>
		</IconButton>
	);

	return (
		<>
			<AppBar position="fixed" className={classes.appBar} color="inherit">
				<Toolbar>
					<Typography
						variant="h6"
						className={classes.title}
						color="inherit"
						component={Link}
						to="/"
					>
						Gamekube Store
					</Typography>
					<div className={classes.grow} />
					{isInCart ? <CartButton /> : null}
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Navbar;
