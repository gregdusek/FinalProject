import styled from 'styled-components';

export const StyledFormGroup = styled.label`
	display: block;
	margin: 2rem 0;
	text-align: center;
	margin-bottom: 1rem;
	position: relative;
	&:first-child {
		margin-top: 3rem;
	}
	&:last-of-type {
		margin-bottom: 3rem;
	}
	input {
		background: #111;
		width: 90%;
		max-width: 430px;
		padding: 0.8rem;
		border-radius: 3px;
		box-shadow: none;
		border-style: solid;
		font-size: 1.1rem;
		border: none;
		color: #ffb500;
		&:focus,
		&:hover {
			background: rgb(30, 30, 30);
		}
	}
`;

export const ErrorText = styled.small`
	color: #ffb500;
	display: block;
	bottom: -1rem;
	font-size: 1.1rem;
`;