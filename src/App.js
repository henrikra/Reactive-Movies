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
				console.log(result.Search);
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
			searchURL: searchURLBase + encodeURIComponent(this.state.query)
		});
	}
	loadMoreResults = event => {
		console.log("ennen " + this.state.page);
		var newPage = this.state.page + 1;
		this.setState({
			page: newPage
		});
		console.log("jälkeen " + this.state.page);
		var searchURLBase = 'http://www.omdbapi.com/?page=' + this.state.page + '&s=';
		this.setState({
			searchURL: searchURLBase + encodeURIComponent(this.state.query)
		});
		var currentSearchResults = this.state.searchResults;


		$.get(this.state.searchURL, function(result) {
			result.Search.forEach(function(movie) {
				currentSearchResults.push(movie); // gfzizz
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
	    			<input className="search-box" type="search" onKeyUp={this.search} onChange={this.updateSearchURL} />
	    		</div>
	    	</nav>
	    	<div className="container">
	      	<p>{this.state.searchURL}</p>
	      	<SearchResults movies={this.state.searchResults} />
	      	<button type="button" onClick={this.loadMoreResults} >Show more</button>
	      </div>
      </div>
    );
  }
}
