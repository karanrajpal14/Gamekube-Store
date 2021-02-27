import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	InputLabel,
	Select,
	MenuItem,
	Button,
	Grid,
	Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { commerce } from "../../lib/commerce";
import { FormInput } from "./";

const ShippingForm = ({ checkoutToken }) => {
	const [shippingCountries, setShippingCountries] = useState([]);
	const [shippingCountry, setShippingCountry] = useState("");
	const [shippingDistricts, setShippingDistricts] = useState([]);
	const [shippingDistrict, setShippingDistrict] = useState("");
	const [shippingOptions, setShippingOptions] = useState([]);
	const [shippingOption, setShippingOption] = useState("");
	const methods = useForm();

	const fetchShippingCountries = async (checkoutTokenId) => {
		const {
			countries,
		} = await commerce.services.localeListShippingCountries(
			checkoutTokenId
		);
		setShippingCountries(countries);
		setShippingCountry(Object.keys(countries)[0]);
		setShippingDistricts([]);
		setShippingDistrict("");
		setShippingOptions([]);
		setShippingOption("");
	};

	const fetchShippingDistricts = async (countryCode) => {
		const { subdivisions } = await commerce.services.localeListSubdivisions(
			countryCode
		);
		setShippingDistricts(subdivisions);
		setShippingDistrict(Object.keys(subdivisions)[0]);
	};

	const fetchShippingOptions = async (
		checkoutTokenId,
		country,
		district = null
	) => {
		const options = await commerce.checkout.getShippingOptions(
			checkoutTokenId,
			{ country, district }
		);
		setShippingOptions(options);
		setShippingOption(options[0]?.id);
	};

	useEffect(() => {
		fetchShippingCountries(checkoutToken?.id);
	}, []);

	useEffect(() => {
		if (shippingCountry) fetchShippingDistricts(shippingCountry);
	}, [shippingCountry]);

	useEffect(() => {
		if (shippingDistrict)
			fetchShippingOptions(
				checkoutToken?.id,
				shippingCountry,
				shippingDistrict
			);
	}, [shippingCountry, shippingDistrict]);

	return (
		<>
			<FormProvider {...methods}>
				<form onSubmit="">
					<Grid container spacing={3}>
						<FormInput name="firstName" label="First Name" />
						<FormInput name="lastName" label="Last Name" />
						<FormInput name="email" label="Email" />
						<FormInput name="phone" label="Phone Number" />
						<FormInput name="address1" label="Address 1" />
						<FormInput name="address2" label="Address 2" />
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select
								value={shippingCountry}
								fullWidth
								onChange={(e) =>
									setShippingCountry(e.target.value)
								}
							>
								{Object.entries(shippingCountries).map(
									([code, country]) => (
										<MenuItem key={code} value={code}>
											{country}
										</MenuItem>
									)
								)}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping District</InputLabel>
							<Select
								value={shippingDistrict}
								fullWidth
								onChange={(e) =>
									setShippingDistrict(e.target.value)
								}
							>
								{Object.entries(shippingDistricts).map(
									([code, district]) => (
										<MenuItem key={code} value={code}>
											{district}
										</MenuItem>
									)
								)}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Options</InputLabel>
							<Select
								value={shippingOption}
								fullWidth
								onChange={(e) =>
									setShippingOption(e.target.value)
								}
							>
								{shippingOptions.map((option) => (
									<MenuItem key={option.id} value={option.id}>
										{`${option.description} - (${option.price.formatted_with_symbol})`}
									</MenuItem>
								))}
							</Select>
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item>
							<Button
								component={Link}
								to="/cart"
								variant="outlined"
							>
								Back to Cart
							</Button>
						</Grid>
						<Grid item>
							<Button
								variant="contained"
								color="primary"
								type="submit"
							>
								Next
							</Button>
						</Grid>
					</Grid>
				</form>
			</FormProvider>
		</>
	);
};

export default ShippingForm;