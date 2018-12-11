import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import InputField from 'components/InputField/InputField';
import ImageUpload from 'components/ImageUpload/ImageUpload';

require('./userEdit.scss');

const propTypes = {
	userData: PropTypes.object.isRequired,
	onSave: PropTypes.func,
	error: PropTypes.string,
	isLoading: PropTypes.bool,
};

const defaultProps = {
	onSave: ()=>{},
	error: undefined,
	isLoading: false,
};

class UserEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasChanged: false,
			firstName: props.userData.firstName || '',
			lastName: props.userData.lastName || '',
			title: props.userData.title || '',
			bio: props.userData.bio || '',
			avatar: props.userData.avatar,
			location: props.userData.location || '',
			website: props.userData.website || '',
			orcid: props.userData.orcid || '',
			github: props.userData.github || '',
			twitter: props.userData.twitter || '',
			facebook: props.userData.facebook || '',
			googleScholar: props.userData.googleScholar || '',
		};
		this.onFirstNameChange = this.onFirstNameChange.bind(this);
		this.onLastNameChange = this.onLastNameChange.bind(this);
		this.onTitleChange = this.onTitleChange.bind(this);
		this.onBioChange = this.onBioChange.bind(this);
		this.onAvatarChange = this.onAvatarChange.bind(this);
		this.handleSaveDetails = this.handleSaveDetails.bind(this);
	}

	onFirstNameChange(evt) {
		this.setState({ firstName: evt.target.value, hasChanged: true });
	}

	onLastNameChange(evt) {
		this.setState({ lastName: evt.target.value, hasChanged: true });
	}

	onTitleChange(evt) {
		this.setState({ title: evt.target.value.substring(0, 70).replace(/\n/g, ' '), hasChanged: true });
	}

	onBioChange(evt) {
		this.setState({ bio: evt.target.value.substring(0, 280).replace(/\n/g, ' '), hasChanged: true });
	}

	onAvatarChange(val) {
		this.setState({ avatar: val, hasChanged: true });
	}

	handleSaveDetails(evt) {
		evt.preventDefault();
		const newUserObject = {
			userId: this.props.userData.id,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			avatar: this.state.avatar,
			title: this.state.title,
			bio: this.state.bio,
			location: this.state.location,
			website: this.state.website,
			orcid: this.state.orcid,
			github: this.state.github,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			googleScholar: this.state.googleScholar,
		};
		this.props.onSave(newUserObject);
	}

	render() {
		const expandables = [
			{
				label: 'Location',
				showTextOnButton: true,
				// icon: 'bp3-icon-map-marker',
				value: this.state.location,
				onChange: (evt)=> { this.setState({ location: evt.target.value, hasChanged: true }); }
			},
			{
				label: 'Website',
				showTextOnButton: true,
				// icon: 'bp3-icon-link',
				value: this.state.website,
				onChange: (evt)=> { this.setState({ website: evt.target.value, hasChanged: true }); }
			},
			{
				label: 'Orcid',
				// icon: 'bp3-icon-orcid',
				helperText: `https://orcid.org/${this.state.orcid}`,
				value: this.state.orcid,
				onChange: (evt)=> { this.setState({ orcid: evt.target.value, hasChanged: true }); }
			},
			{
				label: 'Github',
				// icon: 'bp3-icon-github',
				helperText: `https://github.com/${this.state.github}`,
				value: this.state.github,
				onChange: (evt)=> { this.setState({ github: evt.target.value, hasChanged: true }); }
			},
			{
				label: 'Twitter',
				// icon: 'bp3-icon-twitter',
				helperText: `https://twitter.com/${this.state.twitter}`,
				value: this.state.twitter,
				onChange: (evt)=> { this.setState({ twitter: evt.target.value, hasChanged: true }); }
			},
			{
				label: 'Facebook',
				// icon: 'bp3-icon-facebook',
				helperText: `https://facebook.com/${this.state.facebook}`,
				value: this.state.facebook,
				onChange: (evt)=> { this.setState({ facebook: evt.target.value, hasChanged: true }); }
			},
			{
				label: 'Google Scholar',
				// icon: 'bp3-icon-google-scholar',
				helperText: `https://scholar.google.com/citations?user=${this.state.googleScholar}`,
				value: this.state.googleScholar,
				onChange: (evt)=> { this.setState({ googleScholar: evt.target.value, hasChanged: true }); }
			},
		];
		return (
			<div className="user-edit-component">
				<div className="container narrow nav">
					<div className="row">
						<div className="col-12">
							<h1>Edit User Details</h1>
							<form onSubmit={this.handleSaveDetails}>
								<InputField
									label="First Name"
									isRequired={true}
									value={this.state.firstName}
									onChange={this.onFirstNameChange}
								/>
								<InputField
									label="Last Name"
									isRequired={true}
									value={this.state.lastName}
									onChange={this.onLastNameChange}
								/>
								<ImageUpload
									htmlFor="avatar-upload"
									label="Avatar Image"
									defaultImage={this.state.avatar}
									onNewImage={this.onAvatarChange}
									useCrop={true}
								/>
								<InputField
									label="Title"
									value={this.state.title}
									onChange={this.onTitleChange}
									helperText={`${this.state.title.length}/70 characters. Displayed by your name on discussions.`}
								/>
								<InputField
									label="Bio"
									isTextarea={true}
									value={this.state.bio}
									onChange={this.onBioChange}
									helperText={`${this.state.bio.length}/280 characters`}
								/>
								{expandables.map((item)=> {
									return (
										<InputField
											key={`input-field-${item.label}`}
											label={item.label}
											value={item.value}
											onChange={item.onChange}
											helperText={item.helperText}
										/>
									);
								})}

								<div className="buttons">
									<InputField error={this.props.error && 'Error Saving Details'}>
										<Button
											name="create"
											type="submit"
											className="bp3-button bp3-intent-primary"
											onClick={this.handleSaveDetails}
											text="Save Details"
											disabled={!this.state.firstName || !this.state.lastName || !this.state.hasChanged}
											loading={this.props.isLoading}
										/>
									</InputField>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

UserEdit.defaultProps = defaultProps;
UserEdit.propTypes = propTypes;
export default UserEdit;
