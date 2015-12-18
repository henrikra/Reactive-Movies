import React, { Component } from 'react';
var $ = require('jquery');
import SearchResults from './SearchResults';

require('./styles/style.scss')

export default class App extends Component {
	state = {
		searchURL: '',
		searchResults: [],
		page: 1,
		query: ''
	};

	search = event => {
		if (event.keyCode == 13) {
			$.get(this.state.searchURL, function(result) {
				this.setState({
					searchResults: result.Search,
					page: 1
				});
			}.bind(this));
		}
	}
	updateSearchURL = event => {
		var searchURLBase = 'http://www.omdbapi.com/?page=' + this.state.page + '&s=';
		this.state.query = event.target.value;
		this.setState({
			searchURL: searchURLBase + encodeURIComponent(this.state.query),
			page: 1
		});
	}
	loadMoreResults = event => {
		var newPage = this.state.page + 1;
		this.setState({
			page: newPage
		});
		var searchURLBase = 'http://www.omdbapi.com/?page=' + newPage + '&s=' + this.state.query;
		var currentSearchResults = this.state.searchResults;
		$.get(searchURLBase, function(result) {
			result.Search.forEach(function(movie) {
				currentSearchResults.push(movie);
			});
			this.setState({
				searchResults: currentSearchResults
			});
		}.bind(this));
	}
  render() {
    return (
    	<div className="wrap">
	    	<nav>
	    		<div className="container">
	    			<input className="search-box" type="search" size="25" onKeyUp={this.search} onChange={this.updateSearchURL} />
	    		</div>
	    	</nav>
	    	<div className="container">
	      	<p>{this.state.searchURL} -- {this.state.page}</p>
	      	<h2>Search results for: {this.state.query}</h2>
	      	<SearchResults movies={this.state.searchResults} />
	      	<button type="button" onClick={this.loadMoreResults} >Show more</button>
	      	<p>{this.state.searchURL} -- {this.state.page}</p>
	      </div>
      </div>
    );
  }
}
