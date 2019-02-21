import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, NonIdealState } from '@blueprintjs/core';
import InputField from 'components/InputField/InputField';
import PageWrapper from 'components/PageWrapper/PageWrapper';
import { hydrateWrapper, apiFetch } from 'utilities';

require('./signup.scss');

const propTypes = {
	loginData: PropTypes.object.isRequired,
	locationData: PropTypes.object.isRequired,
};

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			isSuccessful: false,
		};
		this.onSignupSubmit = this.onSignupSubmit.bind(this);
		this.onEmailChange = this.onEmailChange.bind(this);
	}

	onSignupSubmit(evt) {
		evt.preventDefault();

		this.setState({ postSignupIsLoading: true, postSignupError: undefined });
		return apiFetch('/api/signup', {
			method: 'POST',
			body: JSON.stringify({
				email: this.state.email.toLowerCase(),
			}),
		})
			.then(() => {
				this.setState({ postSignupIsLoading: false, isSuccessful: true });
			})
			.catch((err) => {
				this.setState({ postSignupIsLoading: false, postSignupError: err });
			});
	}

	onEmailChange(evt) {
		this.setState({ email: evt.target.value });
	}

	render() {
		return (
			<div id="signup-container">
				<PageWrapper
					loginData={this.props.loginData}
					locationData={this.props.locationData}
					hideNav={true}
					hideFooter={true}
				>
					<div className="container small">
						<div className="row">
							<div className="col-12">
								{!this.state.isSuccessful && (
									<div>
										<h1>Signup</h1>

										<form onSubmit={this.onSignupSubmit}>
											<InputField
												label="Email"
												placeholder="example@email.com"
												value={this.state.email}
												onChange={this.onEmailChange}
												error={this.state.postSignupError}
											/>
											<Button
												name="signup"
												type="submit"
												className="bp3-button bp3-intent-primary"
												onClick={this.onSignupSubmit}
												text="Signup"
												disabled={!this.state.email}
												loading={this.state.postSignupIsLoading}
											/>
										</form>
										<a href="/login" className="switch-message">
											Already have an account? Click to Login
										</a>
									</div>
								)}

								{this.state.isSuccessful && (
									<NonIdealState
										title="Signup Successful"
										description={
											<div className="success">
												<p>
													An email has been sent to{' '}
													<b>{this.state.email}</b>
												</p>
												<p>
													Follow the link in that email to create your
													account.
												</p>
											</div>
										}
										visual="tick-circle"
										action={
											<Button
												name="resendEmail"
												type="button"
												className="bp3-button"
												onClick={this.onSignupSubmit}
												text="Resend Email"
												loading={this.state.postSignupIsLoading}
											/>
										}
									/>
								)}
							</div>
						</div>
					</div>
				</PageWrapper>
			</div>
		);
	}
}

Signup.propTypes = propTypes;
export default Signup;

hydrateWrapper(Signup);
