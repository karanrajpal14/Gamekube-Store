import React from "react";
import {
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Typography,
	IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";

const Product = ({ product }) => {
	const classes = useStyles();

	console.log(product);

	return (
		<Card className={classes.root}>
			<CardMedia
				className={classes.media}
				title={product.name}
				image={product.media.source}
			/>
			<CardContent>
				<div className={classes.CardContent}>
					<Typography variant="h5" gutterBottom>
						{product.name}
					</Typography>
					<Typography variant="h5">
						{product.price.formatted_with_symbol}
					</Typography>
					<Typography
						dangerouslySetInnerHTML={{
							__html: product.description,
						}}
						variant="body2"
					/>
				</div>
			</CardContent>
			<CardActions disableSpacing className={classes.cardActions}>
				<IconButton aria-label="Add to Cart">
					<AddShoppingCart />
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default Product;
