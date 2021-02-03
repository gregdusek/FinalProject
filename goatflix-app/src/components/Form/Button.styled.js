import styled from 'styled-components';

const StyledButton = styled.button`
	padding: 1rem 2rem;
	border-radius: 10px;
	border: solid 3px #ffb500;
	font-size: 1.2rem;
	background: rgb(30,30,30);
	color: #ffb500;
	margin: 0 2rem;
	:hover {
		cursor: pointer;
		background: rgb(70,70,70);
	}
`;

export default StyledButton;