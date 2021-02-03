// TODO: Make this actually keep an aspect ratio when resizing: https://css-tricks.com/aspect-ratio-boxes/
import styled from 'styled-components';
import {$medYellow} from '../../utilities/colors.styled';

export const TrailerContainer = styled.div`
	height: 600px;
	margin: 0 0 3rem 0rem;
`;

export const Title = styled.h2`
	color: ${$medYellow};
	margin: 2.5rem 0 2rem;
`;

export const YoutubeFrame = styled.iframe`
	max-height: 888px;
	min-height: 560px;
	width: 100%;
`;