import React, { Component } from 'react';
var $ = require('jquery');
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

require('../styles/style.scss');

export default class App extends Component {
	state = {
		searchResults: [],
		page: 1,
		query: '',
		loading: false
	}

	loadMoreResults = event => {
		var newPage = this.state.page + 1;
		this.setState({
			page: newPage,
			loading: true
		});
		var searchURLBase = 'http://www.omdbapi.com/?page=' + newPage + '&s=' + this.state.query;
		var currentSearchResults = this.state.searchResults;
		$.get(searchURLBase, function(result) {
			result.Search.forEach(function(movie) {
				currentSearchResults.push(movie);
			});
			this.setState({
				searchResults: currentSearchResults,
				loading: false
			});
		}.bind(this));
	}
	handleQuerySubmit = query => {
		$.get('http://www.omdbapi.com/?page=1&s=' + query, function(result) {
			this.setState({
				searchResults: result.Search
			});
		}.bind(this));
	}
  render() {
  	var showMoreContent;
  	if (this.state.loading) {
  		showMoreContent = <img className="ajax-loader" src='http://static.hypable.com/wp-content/themes/hypable/images/ajax_loader_gray.gif' />
  	} else {
  		showMoreContent = <button className="show-more-btn" type="button" onClick={this.loadMoreResults} >Show more</button>;
  	}
    return (
    	<div className="app">
	    	<SearchBar onQuerySubmit={this.handleQuerySubmit} />
	    	<div className="container">
	      	<SearchResults movies={this.state.searchResults} />
	      	<div className="show-more-container">
	      		{showMoreContent}
	      	</div>
	      </div>
	      <footer>&copy; {new Date().getFullYear()} Henrik Raitasola</footer>
      </div>
    );
  }
}
