import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
	CardElement,
	Elements,
	ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { Review } from "./";
import { CheckSharp } from "@material-ui/icons";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const PaymentForm = ({
	checkoutToken,
	shippingData,
	previousStep,
	nextStep,
	onCheckout,
}) => {
	const handleSubmit = async (event, elements, stripe) => {
		event.preventDefault();

		if (!stripe || !elements) return;

		const cardElement = elements.getElement(CardElement);
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: cardElement,
		});

		console.log(shippingData);

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

			console.log("%%%%");
			console.log(orderDetails);
			console.log("%%%%");

			onCheckout(checkoutToken.id, orderDetails);

			nextStep();
		}
	};
	return (
		<>
			<Review checkoutToken={checkoutToken} shippingData={shippingData} />
			<Divider />
			<Typography variant="h6" gutterBottom>
				Payment Method
			</Typography>
			<Elements stripe={stripePromise}>
				<ElementsConsumer>
					{({ elements, stripe }) => (
						<form
							onSubmit={(e) => handleSubmit(e, elements, stripe)}
						>
							<CardElement />
							<div>
								<Button
									variant="outlined"
									onClick={previousStep}
								>
									Back
								</Button>
								<Button
									variant="contained"
									disabled={!stripe}
									type="submit"
									color="primary"
								>
									{`Pay ${checkoutToken.live.subtotal.formatted_with_symbol}`}
								</Button>
							</div>
						</form>
					)}
				</ElementsConsumer>
			</Elements>
		</>
	);
};

export default PaymentForm;
