import React, { Component } from 'react';
import $ from 'jquery';
var Typeahead = require('react-typeahead').Typeahead;

export default class SearchBar extends Component {
	state = {
		query: '',
		type: '',
		options: []
	}
	handleSubmit = event => {
		if (event) {
			event.preventDefault();
		}
		var query = this.state.query.trim();
		var type = this.state.type.trim();
		if (!query) {
			return;
		}
		this.props.onQuerySubmit(query, type);
		$('.typeahead-selector').hide();
		this.setState({type: ''});
	}
	handleTypeChange = (event) => {
		this.setState({type: event.target.options[event.target.selectedIndex].value});
	}
	handleQueryFocus(event) {
		$(event.target).select();
	}
	displayOptions(option, index) {
		return option.Title;
	}
	getOptions = event => {
		if (event.keyCode == 13) {
			this.handleSubmit();
			$(event.target).blur();
		} else {
			$('.typeahead-selector').show();
			this.setState({query: event.target.value});
			$.get('http://www.omdbapi.com/?s=' + event.target.value, (result) => {
				if (result.Search) {
					this.setState({options: result.Search });
				} else {
					this.setState({options: [] });
				}
			});
		}
	}
	setSelectedOption = option => {
		this.setState({query: option.Title});
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
			  		<Typeahead
					    options={this.state.options}
					    maxVisible={7}
					    filterOption="Title"
					    displayOption={this.displayOptions}
					    onKeyUp={this.getOptions}
					    customClasses={
					    	{input: 'search-form--box'}
					    }
					    onOptionSelected={this.setSelectedOption}
					    placeholder="Search movies or series..."
					    onFocus={this.handleQueryFocus}
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