import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
	Paper,
	Stepper,
	Step,
	StepLabel,
	Typography,
	Button,
	CssBaseline,
} from "@material-ui/core";
import useStyles from "./styles";
import { commerce } from "../../../lib/commerce";
import { ShippingForm, PaymentForm, Confirmation } from "../";

const Checkout = ({ cart, order, onCheckout, error }) => {
	const classes = useStyles();
	const history = useHistory();
	const [step, setStep] = useState(0);
	const [checkoutToken, setCheckoutToken] = useState(null);
	const [shippingData, setShippingData] = useState({});

	useEffect(() => {
		const generateToken = async () => {
			if (cart && cart.id) {
				try {
					const token = await commerce.checkout.generateToken(
						cart.id,
						{
							type: "cart",
						}
					);
					setCheckoutToken(token);
				} catch (error) {
					console.log(error);
					history.push("/");
				}
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
		<ShippingForm checkoutToken={checkoutToken} nextStep={next} />,
		<PaymentForm
			checkoutToken={checkoutToken}
			shippingData={shippingData}
			previousStep={previousStep}
			nextStep={nextStep}
			onCheckout={onCheckout}
		/>,
		<Confirmation order={order} />,
	];

	if (error) {
		<>
			<Typography variant="h5">Error: {error}</Typography>
			<br />
			<Button variant="outlined" component={Link} to="/">
				Browse more amazing products
			</Button>
		</>;
	}

	return (
		<>
			<CssBaseline />
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
