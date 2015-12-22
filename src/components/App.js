import React, { Component } from 'react';
import $ from 'jquery';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import InfiniteScroll from './InfiniteScroll';

require('../styles/style.scss');

export default class App extends Component {
	state = {
		searchResults: [],
		loading: false,
		page: 1
	}
	getMovies = (query, page, currentSearchResults = []) => {
		this.setState({loading: true});
		$.get('http://www.omdbapi.com/?page=' + page + '&s=' + query, function(result) {
			this.setState({
				searchResults: currentSearchResults.concat(result.Search),
				loading: false,
				query: query,
				page: page
			});
		}.bind(this));
	}
	handleQuerySubmit = query => {
		this.getMovies(query, 1);
	}
	handleShowMoreClick = page => {
		this.getMovies(this.state.query, page, this.state.searchResults);
	}
  render() {
    return (
    	<div className="app">
	    	<SearchBar onQuerySubmit={this.handleQuerySubmit} />
	    	<div className="container">
	      	<MovieList movies={this.state.searchResults} />
	      	<div className="show-more-container">
	      		<InfiniteScroll
	      			loading={this.state.loading}
	      			hasMovies={this.state.searchResults.length}
	      			onShowMoreClick={this.handleShowMoreClick}
	      			page={this.state.page}
	      		/>
	      	</div>
	      </div>
	      <footer>&copy; {new Date().getFullYear()} Henrik Raitasola</footer>
      </div>
    );
  }
}
