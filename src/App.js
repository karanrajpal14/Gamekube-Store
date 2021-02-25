import React, { Component } from "react";

import { Products, Navbar } from "./components";

class App extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<Products />
			</div>
		);
	}
}

export default App;
