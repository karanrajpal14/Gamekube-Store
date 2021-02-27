import React, { useState, useEffect } from "react";
import {
	Paper,
	Stepper,
	Step,
	StepLabel,
	Typography,
	CircularProgress,
	Divider,
	Button,
} from "@material-ui/core";
import useStyles from "./styles";
import { commerce } from "../../../lib/commerce";
import { ShippingForm, PaymentForm, Confirmation } from "../";

const Checkout = ({ cart }) => {
	const classes = useStyles();
	const [step, setStep] = useState(0);
	const [checkoutToken, setCheckoutToken] = useState(null);
	const [shippingData, setShippingData] = useState({});

	useEffect(() => {
		const generateToken = async () => {
			try {
				const token = await commerce.checkout.generateToken(cart?.id, {
					type: "cart",
				});
				console.log(token);
				setCheckoutToken(token);
			} catch (error) {
				console.error(error);
			}
		};
		generateToken();
	}, [cart]);

	const nextStep = () =>
		setStep((previousStepState) => previousStepState + 1);
	const previousStep = () =>
		setStep((previousStepState) => previousStepState - 1);

	const next = (data) => {
		setShippingData(data);
		nextStep();
	};

	const steps = ["Shipping Information", "Payment", "Confirmation"];
	const stepComponents = [
		<ShippingForm checkoutToken={checkoutToken} next={next} />,
		<PaymentForm />,
		<Confirmation />,
	];

	return (
		<>
			<div className={classes.toolbar} />
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography variant="h4" align="center">
						Checkout
					</Typography>
					<Stepper activeStep={step} className={classes.stepper}>
						{steps.map((step) => (
							<Step key={step}>
								<StepLabel>{step}</StepLabel>
							</Step>
						))}
					</Stepper>
					{checkoutToken && stepComponents[step]}
				</Paper>
			</main>
		</>
	);
};

export default Checkout;
