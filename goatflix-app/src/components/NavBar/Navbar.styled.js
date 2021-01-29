import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledNavbar = styled.div`
        display: flex;
        height: 4.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: calc(10px + 2vmin);
        color: #111;
        width: 100%;
        transition: 0.3s;
        z-index: 999;
        ${props =>
            props.sticky
                ? `
            transform: translateY(0);
            top: 0;
            position: fixed;
            box-shadow: 0 3px 6px rgba(0,0,0,0.3);
            `
                : `
            position: absolute;
            transform: translateY(-4.8rem);
		`};
`;