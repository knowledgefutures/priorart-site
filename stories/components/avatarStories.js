import React from 'react';
import { storiesOf } from '@storybook/react';
import Avatar from 'components/Avatar/Avatar';

require('components/Avatar/avatar.scss');

const wrapperStyle = { padding: '1em', display: 'flex', alignItems: 'flex-end' };

const plain = {
	userInitials: 'MF',
};

const image = {
	userAvatar: 'https://assets.pubpub.org/mflaxicd/11505393046254.jpg',
	width: 50,
};

const border = {
	userAvatar: 'https://assets.pubpub.org/mflaxicd/11505393046254.jpg',
	borderColor: 'red',
};

const sizes = [25, 50, 100, 250];
const colors = ['green', 'blue', 'red', 'purple', 'cyan', 'orange', 'magenta', 'pink'];
storiesOf('Components/Avatar', module).add('default', () => (
	<div>
		<div style={wrapperStyle}>
			{sizes.map((size) => {
				return <Avatar key={`plain-${size}`} {...plain} width={size} />;
			})}
		</div>

		<div style={wrapperStyle}>
			{sizes.map((size) => {
				return <Avatar key={`image-${size}`} {...image} width={size} />;
			})}
		</div>

		<div style={wrapperStyle}>
			{sizes.map((size) => {
				return <Avatar key={`border-${size}`} {...border} width={size} />;
			})}
		</div>

		<div style={wrapperStyle}>
			{colors.map((color, index) => {
				return (
					<Avatar
						key={`overlap-${color}`}
						{...image}
						borderColor={color}
						instanceNumber={index}
						doesOverlap={true}
					/>
				);
			})}
		</div>
		<div style={wrapperStyle}>
			{colors.map((color, index) => {
				return (
					<Avatar
						key={`overlapImage-${color}`}
						{...image}
						instanceNumber={index}
						doesOverlap={true}
					/>
				);
			})}
		</div>

		<div style={wrapperStyle}>
			{colors.map((color, index) => {
				return (
					<Avatar
						key={`overlapSmall-${color}`}
						{...image}
						borderColor={color}
						width={25}
						instanceNumber={index}
						doesOverlap={true}
					/>
				);
			})}
		</div>
	</div>
));
