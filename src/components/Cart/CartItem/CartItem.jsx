import React from "react";
import {
	Typography,
	Button,
	Card,
	CardActions,
	CardMedia,
	CardContent,
} from "@material-ui/core";
import useStyles from "./styles";

const CartItem = ({ item, handleUpdateCart, handleRemoveFromCart }) => {
	const classes = useStyles();
	return (
		<Card>
			<CardMedia
				image={item.media.source}
				alt={item.name}
				className={classes.media}
			></CardMedia>
			<CardContent className={classes.cardContent}>
				<Typography variant="h4">{item.name}</Typography>
				<Typography variant="h5">
					{item.line_total.formatted_with_symbol}
				</Typography>
			</CardContent>
			<CardActions className={classes.cartActions}>
				<div className={classes.buttons}>
					<Button
						variant="text"
						color="secondary"
						type="button"
						size="small"
						onClick={() =>
							handleUpdateCart(item.id, item.quantity - 1)
						}
					>
						-
					</Button>
					<Typography>{item.quantity}</Typography>
					<Button
						variant="text"
						color="primary"
						type="button"
						size="small"
						onClick={() =>
							handleUpdateCart(item.id, item.quantity + 1)
						}
					>
						+
					</Button>
					<Button
						variant="contained"
						color="secondary"
						type="button"
						onClick={() => handleRemoveFromCart(item.id)}
					>
						Remove
					</Button>
				</div>
			</CardActions>
		</Card>
	);
};

export default CartItem;
