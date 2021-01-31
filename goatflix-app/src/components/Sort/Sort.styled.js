import styled from 'styled-components';


export const StyledSort = styled.div`
	h4 {
		margin: 1rem;
		${'' /* margin-bottom: 1rem; */}
		font-size: 1.4rem;
		color: rgba(255, 255, 255)
	}
	border-radius: 10px;
	width: 75%;
	height: 75%;
	margin-top: 2.5rem;
	${'' /* background: #111; */}
	display: inline-block;
	padding: 1rem;
`;

export const SortButton = styled.button`
	font-size: 1.2rem;
	background: rgba(30, 30, 30);
	width: 30%;
	height: 40px;
	border-radius: 10px;
	border: none;
	margin: 0.5rem;
	color: #ffb500;
	:hover {
		cursor: pointer;
	}
	${({ active }) => active && `color: #ffb500`};
`;