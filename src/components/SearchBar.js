import React, { Component } from 'react';
import $ from 'jquery';

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
		$(this.refs.box).blur();
	}
	handleTypeChange = (event) => {
		this.setState({type: event.target.options[event.target.selectedIndex].value});
	}
	handleQueryFocus(event) {
		$(event.target).select();
	}
	render() {
		var submitBtn;
		if (this.props.loading) {
			submitBtn = <input className="search-form--submit-btn" disabled="disabled" type="submit" value="Loading" />
		} else {
			submitBtn = <input className="search-form--submit-btn" type="submit" value="Search" />
		}
		return (
			<nav>
				<form className="search-form" onSubmit={this.handleSubmit} >
		  		<div className="container">
		  			<input
		  				ref="box"
		  				className="search-form--box"
		  				type="search"
		  				placeholder="Search movies or series..."
		  				value={this.state.query}
		  				onChange={this.handleQueryChange}
		  				onFocus={this.handleQueryFocus}
		  				autoFocus
		  			/>
		  			<select value={this.state.type}
		  				className="search-form--type"
		  				onChange={this.handleTypeChange}
		  			>
		  				<option value="">All</option>
		  				<option value="movie">Movies</option>
		  				<option>Series</option>
		  			</select>
		  			{submitBtn}
		  		</div>
	  		</form>
	  	</nav>
		)
	}
}