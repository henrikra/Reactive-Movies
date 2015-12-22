import React, { Component } from 'react';
var $ = require('jquery');
import SearchResults from './SearchResults';

require('./styles/style.scss')

export default class App extends Component {
	state = {
		searchURL: '',
		searchResults: [],
		page: 1,
		query: '',
		loading: false
	};

	search = event => {
		if (event.keyCode == 13) {
			this.setState({
				loading: true
			});
			$.get(this.state.searchURL, function(result) {
				this.setState({
					searchResults: result.Search,
					page: 1,
					loading: false
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
  render() {
  	var showMoreContent;
  	if (this.state.loading) {
  		showMoreContent = <img className="ajax-loader" src='http://static.hypable.com/wp-content/themes/hypable/images/ajax_loader_gray.gif' />
  	} else {
  		showMoreContent = <button className="show-more-btn" type="button" onClick={this.loadMoreResults} >Show more</button>;
  	}
    return (
    	<div className="app">
	    	<nav>
	    		<div className="container">
	    			<input className="search-box" type="search" size="25" onKeyUp={this.search} onChange={this.updateSearchURL} />
	    		</div>
	    	</nav>
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
