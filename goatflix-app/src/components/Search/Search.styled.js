import styled from 'styled-components';

export const SearchForm = styled.form`
	position: relative;
	margin-right: 2rem;
`;

export const SearchInput = styled.input`
	border-radius: 22px;
	background: rgb(70, 70, 70);
	color: #ffb500;
	border: 3px solid #ffb500;
	height: 50px;
	font-size: 1.3rem;
	padding-left: 3.5rem;
	}

	@media (max-width: 650px) {
		max-width: 44px;
		margin-right: -1rem;
	}
	
	&::placeholder {
		color: rgb(255,255,255);
	}
`;

export const SearchIcon = styled.div`
	position: absolute;
	left: 1rem;
	top: 9px;
	cursor: text;
`;

export const Icon = styled.img`
	height: 85%;
	width: 85%;
`;