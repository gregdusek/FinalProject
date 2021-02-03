
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SearchForm, SearchInput, SearchIcon, Icon } from './Search.styled';

const handleSubmit = (e, input, history) => {
	e.preventDefault();
	if (input === '') return;
	history.push(`/search=${input}`);
};

class Search extends Component {
	constructor(props) {
		super(props);
		this.inputRef = React.createRef();
	}

	state = {
		input: '',
	};

	static propTypes = {
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
		}).isRequired,
		onSubmit: PropTypes.func,
	};

	static defaultProps = {
		onSubmit: handleSubmit,
	};

	handleChange = e => {
		this.setState({ input: e.target.value });
	};

	render() {
		const { input } = this.state;
		const { onSubmit, history } = this.props;
		return (
			<SearchForm
				id="searchbutton-form"
				onSubmit={e => onSubmit(e, input, history)}
				onClick={() => this.inputRef.current.focus()}
			>
				<SearchInput
					id="searchbutton-field"
					type="text"
					value={input}
					onChange={this.handleChange}
					ref={this.inputRef}
					placeholder="Search..."
					aria-label="Search"
				/>
				<SearchIcon>
						<Icon
							id="search-icon" src="https://res.cloudinary.com/gregdusek/image/upload/v1609890114/GOATflix/search_icon_mpdoc3.png" alt="" />
				</SearchIcon>
			</SearchForm>
		);
	}
}

export default withRouter(Search);