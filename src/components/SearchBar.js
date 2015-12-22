import React, { Component } from 'react';

export default class SearchBar extends Component {
	state = {
		query: ''
	}
	handleQueryChange = event => {
		this.setState({query: event.target.value});
	}
	handleSubmit = event => {
		event.preventDefault();
		var query = this.state.query.trim();
		if (!query) {
			return;
		}
		this.props.onQuerySubmit(query);
		this.setState({query: ''});
	}
	render() {
		return (
			<nav>
				<form onSubmit={this.handleSubmit} >
		  		<div className="container">
		  			<input
		  				className="search-box"
		  				type="search"
		  				placeholder="Search movies..."
		  				value={this.state.query}
		  				onChange={this.handleQueryChange} />
		  		</div>
	  		</form>
	  	</nav>
		)
	}
}