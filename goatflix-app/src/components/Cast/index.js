import React, { Component } from 'react';
import blankPhoto from '../images/blank.png';
import {
	StyledCast,
	CastGrid,
	CastMember,
	CastProfile,
	CastDetails,
	CreditName,
	CreditCharacter,
	SeeMore,
	SeeMoreContainer,
} from './Cast.styled';

export const CAST_PATH = 'https://image.tmdb.org/t/p/w185';

export default class Cast extends Component {
	state = {
		castCount: 6,
	};

	seeMore = () => {
		const { credits } = this.props;
		const { castCount } = this.state;
		if (castCount === credits.length) return;
		this.setState({ castCount: castCount + 10 });
	};

	render() {
		const { credits } = this.props;
		const { castCount } = this.state;
		const cast = credits.cast.slice(0, castCount);
		return (
			<StyledCast>
				<h2 id="cast-crew" style={{color: '#ffb500'}}>Cast &amp; Crew</h2>
				<CastGrid>
					{cast &&
						cast.map(credit => (
							<CastMember id="movie-credit" key={credit.credit_id}>
								<CastProfile
									id="credit-photo"
									src={
										credit.profile_path
											? `${CAST_PATH}${credit.profile_path}`
											: blankPhoto
									}
									alt={credit.name}
								/>
								<CastDetails>
									<CreditName id="credit-name">{credit.name}</CreditName>
									<CreditCharacter id="credit-character">
										{credit.character}
									</CreditCharacter>
								</CastDetails>
							</CastMember>
						))}
				</CastGrid>

				{castCount < credits.cast.length && (
					<SeeMoreContainer>
						<SeeMore onClick={this.seeMore}>See More</SeeMore>
					</SeeMoreContainer>
				)}
			</StyledCast>
		);
	}
}
