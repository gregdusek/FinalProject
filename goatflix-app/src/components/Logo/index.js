import React from 'react';
import { StyledLogo, StyledGoat, StyledWords} from './Logo.styled';



const Logo = () => {
	return (
		<StyledLogo >
			<StyledGoat 
				id="goat" src="https://res.cloudinary.com/gregdusek/image/upload/v1609810374/GOATflix/goat_nnchqt.png" alt=""/>
			<StyledWords 
				id="words" src="https://res.cloudinary.com/gregdusek/image/upload/v1612079771/GOATflix/wordlogo_ykvghy.png" alt=""/>
		</StyledLogo>
	);
};

export default Logo;