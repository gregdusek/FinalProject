import React from 'react';
import { StyledSort, SortButton } from './Sort.styled';


const Sort = ({ sortBy, setSortBy }) => {
	return (
		<StyledSort>
			<h4>Sort by:</h4>
			<SortButton
				active={sortBy === 'popularity.desc'}
				onClick={() => setSortBy('popularity.desc')}
			>
				most popular
			</SortButton>
			<SortButton
				active={sortBy === 'release_date.desc'}
				onClick={() => setSortBy('release_date.desc')}
			>
				newest
			</SortButton>
			<SortButton
				active={sortBy === 'vote_average.desc'}
				onClick={() => setSortBy('vote_average.desc')}
			>
				top rated
			</SortButton>
		</StyledSort>
	);
};

export default Sort;
