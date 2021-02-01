import styled from 'styled-components';
import {$medYellow, $medGrey, $darkGrey, $justWhite} from '../../utilities/colors.styled';

export const MovieGrid = styled.div`
	margin: 0 auto;
	display: grid;
	justify-content: center;
	padding: 2rem;
	grid-template-columns: repeat(5, 1fr);
	grid-template-rows: repeat(4, 3fr);
	grid-column-gap: 3rem;
	grid-row-gap: 3rem;
	max-width: 1080px;
	@media (max-width: 1020px) {
		grid-template-columns: repeat(4, 1fr);
	}
	@media (max-width: 820px) {
		grid-template-columns: repeat(3, 1fr);
	}
	@media (max-width: 620px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (max-width: 420px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;

export const GenreTab = styled.div`
	display: inline-block;
	background: rgba(0, 0, 0, 0.6);
	border-radius: 3px;
	color: #ffb500;
	padding: 0.2rem 0.4rem;
	margin: 0.1rem;
	text-align: center;
`;

export const GenreList = styled.div`
	margin-top: 0.2rem;
	text-align: center;
`;

export const LoadMore = styled.div`
	display: inline-block;
	font-size: 0.9rem;
	margin: 0 auto 5rem;
	padding: 1rem;
	width: 150px;
	border-radius: 22px;
	background: #111;
	transition: 0.3s;
	color: ${({ loading }) => (loading ? $medGrey : $medYellow)};
	cursor: ${({ loading }) => (loading ? 'wait' : 'pointer')};

	&:hover {
		color: ${({ loading }) => (loading ? $medGrey  : '#fff')};
	}

	display: flex;
	justify-content: center;
	align-items: center;
`;