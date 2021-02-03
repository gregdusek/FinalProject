import styled from 'styled-components';
import StyledButton from '../Form/Button.styled';
import {$medYellow, $medGrey, $darkGrey} from '../../utilities/colors.styled';


export const MovieWrapper = styled.div`
	position: relative;
`;

export const Background = styled.div`
	position: absolute;
	height: 100%;
	width: 100vw;
	background: url(${props => props.backdrop}) center center no-repeat;
	background-size: cover;
	z-index: -1;
	
`;

export const MovieInfo = styled.div`
	background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(10, 10, 10, 1));
	margin: 1 rem;
	display: flex;
	text-align: left;
	color: '#ffb500';
	padding: 8rem 5%;
	justify-content: center;
	@media (max-width: 760px) {
		display: flex;
	}
	@media (max-width: 360px) {
		padding: 6rem 1rem;
	}
`;

export const MainContent = styled.div`
	position: relative;
	display: column;
	margin: 0 5rem 0 10rem;
	${'' /* max-height: 100vh;
	max-width: auto; */}
	${'' /* overflow: auto; */}
	h1 {
		margin-bottom: 0.4rem;
	}
	@media (max-width: 760px) {
		padding: 0;
	}
`;

export const SidePanel = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	max-height: 100vh; */}
	max-width: auto;
	margin: 0 0rem 5rem 10rem;
	
	@media (max-width: 760px) {
		margin: 0 auto;
	}
`;

export const GenreTab = styled.div`
	display: inline-block;
	justify-content: center;
	background: rgba(0, 0, 0, 0.6);
	border-radius: 5px;
	color: ${$medYellow};
	padding: 0.5rem 0.5rem;
	margin: 0.2rem;
	text-align: center;
	:last-child {
		margin-bottom: 2rem;
	}
`;

export const Votes = styled.div`
	display: flex;
	color: ${$medYellow};
	font-size: 1.4rem;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin: 0 auto 1rem;
	padding: 0.4rem 0rem 1rem 0.2rem;
	text-align: center;
	border-radius: 22px;
	div {
		margin-top: 0.5rem;
	}
`;

export const SideStat = styled.div`
	color: white;
	font-weight: bold;
	text-align: left;
	margin-bottom: 2.5rem;
	span {
		color: ${$medYellow};
		font-size: 1.1rem;
	}
	h3 {
		margin: .5rem;
		font-size: 1.6rem;
		font-weight: 400;
	}
`;

export const Overview = styled.p`
	color: white;
	text-align: left;
	font-size: 1.2rem;
	font-weight: 400;
	border-radius: 10px;
	line-height: 1.4;

`;

export const Title = styled.div`
	display: inline-block;
	text-shadow: 1px 6px 10px #000;
	margin-bottom: 1rem;
	width: auto;
	h4 {
		color: white;
		font-size: 1.2rem;
		font-weight: 500;
		margin: 0.4rem 0;
	}
`;

export const MainTitle = styled(Title)`
	font-size: 1.9rem;
	text-shadow: 1px 6px 2px #000;
	color: ${$medYellow};
	@media (max-width: 760px) {
		display: none;
	}
`;

export const SideTitle = styled(Title)`
	color: ${$medYellow};
	@media (min-width: 760px) {
		display: none;
	}
`;

export const Button = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 3.125rem;
	width: 3.125rem;
	border-radius: 22px;
	font-size: 1.9rem;
	font-weight: 400;
	transition: 0.3s;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
	background: #111;
	color: #eee;
	border: 1px solid ${$medYellow};
	:hover {
		cursor: pointer;
		background: ${$medYellow};
	}
`;

export const BackButton = styled.div`
	position: fixed;
	top: 9.5rem;
	left: 0;
	cursor: pointer;
	transition: 0.3s;
	opacity: 0.5;
	padding: 1rem;
	svg {
		stroke: ${$medYellow};
		stroke-width: 3;
	}
	&:hover {
		opacity: 1;
		svg {
			stroke: ${$medYellow};
		}
	}
`;


export const RelatedMovies = styled.div`
	display: inline-flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 2rem 1rem;
	margin: 2rem 0;
	border-radius: 12px;
	background: rgba(0, 0, 0, 0.4);
	max-width: 100%;
	text-align: center;
	h4 {
		color: ${$medYellow};
		margin: 0;
	}
	h3 {
		margin: 0.8rem 0;
	}
	img {
		border-radius: 3px;
	}
`;

export const FavoriteButton = styled(StyledButton)`
	margin: 0 0 3.5rem 0;
	border: none;
	width: 100%;
	position: relative;
	transition: 0.2s;
	&:before {
		content: '♥';
		position: absolute;
		left: 5rem;
		top: 0.6rem;
		font-size: 1.8rem;
	}
`;

export const RemoveFavoriteButton = styled(FavoriteButton)`
	background: ${$medYellow};
	color: ${$darkGrey};
	&:hover {
		background: ${$medYellow};
		color: ${$medGrey};
	}
	&:before {
		opacity: 0.3;
	}
`;
