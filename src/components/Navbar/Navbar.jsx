import React from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Badge,
	MenuItem,
	Menu,
	Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";

import logo from "../../assets/logo.png";
import useStyles from "./styles";

const Navbar = ({ cartCount }) => {
	const classes = useStyles();

	return (
		<>
			<AppBar position="fixed" className={classes.appBar} color="inherit">
				<Toolbar>
					<Typography
						variant="h6"
						className={classes.title}
						color="inherit"
					>
						Gamekube Store
					</Typography>
					<div className={classes.grow}></div>
					<div className={classes.button}>
						<IconButton
							aria-label="Show cart items"
							color="inherit"
						>
							<Badge badgeContent={cartCount} color="secondary">
								<ShoppingCart />
							</Badge>
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Navbar;
