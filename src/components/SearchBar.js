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
				<form className="search-form" onSubmit={this.handleSubmit} >
		  		<div className="container">
		  			<input
		  				className="search-form--box"
		  				type="search"
		  				placeholder="Search..."
		  				value={this.state.query}
		  				onChange={this.handleQueryChange}
		  			/>
		  			<select className="search-form--category">
		  				<option>Movies</option>
		  				<option>Series</option>
		  				<option>Episodes</option>
		  			</select>
		  		</div>
	  		</form>
	  	</nav>
		)
	}
}