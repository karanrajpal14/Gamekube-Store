import React from "react";
import { Grid } from "@material-ui/core";

import Product from "./Product/Product";

const products = [
	{
		id: 1,
		name: "God of War",
		image:
			"https://images-na.ssl-images-amazon.com/images/I/811czebxtnL._SL1500_.jpg",
		description: "God of War disc for PS5",
		price: "$60",
	},
	{
		id: 2,
		name: "Apple MacBook Pro",
		image:
			"https://images-na.ssl-images-amazon.com/images/I/71pC69I3lzL._AC_SL1500_.jpg",
		description: "A laptop great for gaming. Just kidding.",
		price: "$2000",
	},
];

const Products = () => {
	return (
		<main>
			<Grid container justify="center" spacing={4}>
				{products.map((product) => (
					<Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
						<Product product={product} />
					</Grid>
				))}
			</Grid>
		</main>
	);
};

export default Products;
