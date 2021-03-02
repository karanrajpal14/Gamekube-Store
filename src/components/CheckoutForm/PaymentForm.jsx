import React from "react";
import {
	Typography,
	Button,
	Divider,
	Grid,
	Container,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import {
	CardElement,
	Elements,
	ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { Review } from "./";
import _ from "lodash";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PaymentForm = ({
	checkoutToken,
	shippingData,
	previousStep,
	nextStep,
	onCheckout,
	timeout,
}) => {
	const stripeCardStyle = {
		style: {
			base: {
				fontSize: "18px",
				color: "#424770",
				"::placeholder": {
					color: "#aab7c4",
				},
			},
			invalid: {
				color: "#9e2146",
			},
		},
	};

	const selectedShippingMethod = _.find(checkoutToken.shipping_methods, [
		"id",
		shippingData.shippingOption,
	]);

	const symbol = checkoutToken.live.currency.symbol;
	const subtotal = parseFloat(checkoutToken.live.subtotal.formatted);
	const shipping = parseFloat(selectedShippingMethod.price.formatted);
	const shipping_with_symbol =
		selectedShippingMethod.price.formatted_with_symbol;
	const total = subtotal + shipping;
	const total_with_symbol = symbol + total;

	const handleSubmit = async (event, elements, stripe) => {
		event.preventDefault();

		if (!stripe || !elements) return;

		const cardElement = elements.getElement(CardElement);
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: cardElement,
		});

		if (error) console.error(error);
		else {
			const orderDetails = {
				line_items: checkoutToken.live.line_items,
				customer: {
					firstname: shippingData.firstName,
					lastname: shippingData.lastName,
					email: shippingData.email,
				},
				shipping: {
					name: "Primary",
					street: shippingData.address1,
					town_city: shippingData.shippingDistrict,
					county_state: shippingData.shippingDistrict,
					postal_zip_code: shippingData.zip,
					country: shippingData.shippingCountry,
				},
				billing: {
					name: "Primary",
					street: shippingData.address1,
					town_city: shippingData.shippingDistrict,
					county_state: shippingData.shippingDistrict,
					postal_zip_code: shippingData.zip,
					country: shippingData.shippingCountry,
				},
				fulfillment: {
					shipping_method: shippingData.shippingOption,
				},
				payment: {
					gateway: "stripe",
					stripe: {
						payment_method_id: paymentMethod.id,
					},
				},
			};
			onCheckout(checkoutToken?.id, orderDetails);

			nextStep();
		}
	};
	return (
		<>
			<Review
				checkoutToken={checkoutToken}
				shippingData={shippingData}
				shipping={shipping_with_symbol}
				total={total_with_symbol}
			/>
			<Divider />
			<Typography variant="h6" gutterBottom style={{ margin: "1em 0" }}>
				Payment Method
			</Typography>
			<Elements stripe={stripePromise}>
				<ElementsConsumer>
					{({ elements, stripe }) => (
						<form
							onSubmit={(e) => handleSubmit(e, elements, stripe)}
						>
							<Container style={{ margin: "2em 0" }}>
								<CardElement options={stripeCardStyle} />
								<Alert
									variant="filled"
									severity="info"
									style={{ margin: "2em 0" }}
								>
									<Typography>
										For testing, you can input:
									</Typography>
									<Typography>
										Card Number: 4242 4242 4242 4242
									</Typography>
									<Typography>Exp Date: 04/24</Typography>
									<Typography>CVC: 242</Typography>
									<Typography>Zip: 42424</Typography>
								</Alert>
							</Container>
							<Grid container spacing={2}>
								<Grid item>
									<Button
										variant="outlined"
										onClick={previousStep}
									>
										Back
									</Button>
								</Grid>
								<Grid item>
									<Button
										variant="contained"
										disabled={!stripe}
										type="submit"
										color="primary"
									>
										{`Pay ${total_with_symbol}`}
									</Button>
								</Grid>
							</Grid>
						</form>
					)}
				</ElementsConsumer>
			</Elements>
		</>
	);
};

export default PaymentForm;
