import styled from 'styled-components';

export const StyledDropdown = styled.div`
	position: relative;
	@media (min-width: 800px) {
		display: none;
	}
`;

export const Top = styled.div`
	// padding: 0 2rem;
	width: 30px;
	height: 20px;
	position: relative;
	box-sizing: content-box;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	div {
		width: 100%;
		height: 4px;
		background: #ffb500;
		border-radius: 10px;
	}
`;

export const Bottom = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: space-around;
	width: 200px;
	height: 100px;
	position: absolute;
	bottom: -133px;
	right: -1rem;
	background: #fff;
	border-radius: 3px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
`;

export const BottomContent = styled.div``;

export const StyledLink = styled.div`
	font-weight: 600;
	padding: 0.5rem;
	font-size: 0.9rem;
	cursor: pointer;
	color: rgb(30, 30, 30);
	&:hover,
	&:hover a {
		background: rgb(75, 75, 75);
		color: #ffb500;
	}
	a {
		display: inline-block;
		width: 100%;
		height: 100%;
		color: rgb(30, 30, 30);
		text-decoration: none;
	}
`;

export const BottomArrow = styled.div`
	background: rgb(70,70,70);
	width: 20px;
	height: 20px;
	position: absolute;
	top: -18px;
	right: 22px;
	clip-path: polygon(50% 40%, 0% 100%, 100% 100%);
`;