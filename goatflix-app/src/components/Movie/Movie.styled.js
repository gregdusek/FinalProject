import styled from 'styled-components';

export const Poster = styled.img`
	width: 300px;
	height: 450px;
	transition: transform 0.3s;
	filter: drop-shadow(#000000 7px 7px 3px);
`;

export const StyledMovie = styled.div`
	max-width: 300px;
	max-height: 450px;
	width: auto;
	height: 100vh;
	position: relative;
	margin: 0;
	
	transition: 0.3s;
	filter: drop-shadow(#000000 7px 7px 3px);
	a {
		text-decoration: none;
		color: #ffb500;
	}
	h3 {
		margin: 0;
		text-align: center;
	}
	h5 {
		margin: 0.5rem 0 0.7rem;
		font-weight: 400;
	}
	:hover {
		-webkit-transform: scale(1.1);
  		-ms-transform: scale(1.1);
  		transform: scale(1.1);
	}
`;

export const Overlay = styled.div`
	background: rgba(0, 0, 0, 0.8);
	height: 100%;
	width: 100%;
	overflow: hidden;
	position: absolute;
	top: 0;
	left: 0;
	border-radius: 3px;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	opacity: 0;
	transition: opacity 0.3s;
	:hover {
		opacity: 1;
	}
`;