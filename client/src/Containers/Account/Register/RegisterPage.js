import React from "react";
import { Card, Tooltip, OverlayTrigger, Button } from "react-bootstrap";
import "../../../css/Register.css";

// This page allows the user to redirect to GitHub to authorize our app to use their credentials
const Register = ({ register }) => {
	function renderTooltip(props) {
		return (
			<Tooltip id="button-tooltip" {...props}>
				We require read access to your public and private repositories
				so that you can create projects based off of your GitHub repos.
				<br />
				<br />
				Your information will NEVER be used for any purposes other than
				to display your repositories. It will also NEVER be shared with
				a third-party.
			</Tooltip>
		);
	}

	return (
		<div className="container">
			<body>
				<Card
					bg="light"
					style={{
						margin: "auto",
						width: "30rem",
						marginTop: "50px",
					}}
				>
					<div className="page-title text-center">Register</div>
					<div className="page-heading page-paragraph text-center">
						<h4>We will need to connect to your GitHub account</h4>
					</div>

					<div className="page-main text-center">
						<a
							className="btn btn-secondary text-center"
							style={{ width: "320px" }}
							href="https://github.com/login/oauth/authorize?client_id=6f0b64a238f52e8c9523&scope=repo"
						>
							<img
								src={require("./GitHub-Mark-32px.png")}
								alt="Github Logo"
							/>{" "}
							&nbsp;{" "}
							<label id="github-button-label">
								Sign up with GitHub
							</label>
						</a>
					</div>

					<div className="text-center">
						Already have an account? <a href="/login">Log in</a>
						<OverlayTrigger
							placement="top"
							delay={{ show: 100, hide: 200 }}
							overlay={renderTooltip}
						>
							<Button
								id="tooltip-trigger"
								variant="primary"
								size="sm"
							>
								Why do I need to connect my GitHub account?
							</Button>
						</OverlayTrigger>
						<br />
						<a href="/">
							<img
								alt="CollabCloud-Logo"
								src={require("../../../logo.png")}
								width="70"
								height="35"
								style={{ marginTop: "20px", marginBottom: "30px" }}
							/>
						</a>
					</div>
				</Card>
			</body>
		</div>
	);
};

export default Register;
