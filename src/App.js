import React, { Component } from 'react';
var $ = require('jquery');
import SearchResults from './SearchResults';

export default class App extends Component {
	state = { searchURL: '' };

	search(searchURL, event) {
		if (event.keyCode == 13) {
			$.get(searchURL, function(result) {
				console.log(result);
			}.bind(this));
		}
	}
	updateSearchURL = event => {
		var searchURLBase = 'http://www.omdbapi.com/?s=';
		let { searchQuery } = event.target;
		this.setState({
			searchURL: searchURLBase + encodeURIComponent(searchQuery)
		});
	}
  render() {
    return (
    	<div className="container">
      	<input type="search" onKeyUp={this.search.bind(this, this.state.searchURL)} onChange={this.updateSearchURL} />
      	<p>{this.state.searchURL}</p>
      	<SearchResults />
      </div>
    );
  }
}
