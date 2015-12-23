import React, { Component } from 'react';

export default class SearchBar extends Component {
	state = {
		query: '',
		type: ''
	}
	handleQueryChange = event => {
		this.setState({query: event.target.value});
	}
	handleSubmit = event => {
		event.preventDefault();
		var query = this.state.query.trim();
		var type = this.state.type.trim();
		if (!query) {
			return;
		}
		this.props.onQuerySubmit(query, type);
		this.setState({query: ''});
	}
	handleTypeChange = (event) => {
		this.setState({type: event.target.options[event.target.selectedIndex].value});
	}
	render() {
		return (
			<nav>
				<form className="search-form" onSubmit={this.handleSubmit} >
		  		<div className="container">
		  			<input
		  				className="search-form--box"
		  				type="search"
		  				placeholder="Search movies or series..."
		  				value={this.state.query}
		  				onChange={this.handleQueryChange}
		  			/>
		  			<select value={this.state.type}
		  				className="search-form--type"
		  				onChange={this.handleTypeChange}
		  			>
		  				<option></option>
		  				<option value="movie">Movies</option>
		  				<option>Series</option>
		  			</select>
		  			<input
		  				className="search-form--submit-btn"
		  				type="submit"
		  				value="Search"
		  			/>
		  		</div>
	  		</form>
	  	</nav>
		)
	}
}