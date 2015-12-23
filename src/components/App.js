import React, { Component } from 'react';
import $ from 'jquery';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import InfiniteScroll from './InfiniteScroll';

require('../styles/style.scss');

export default class App extends Component {
	state = {
		movies: [],
		loading: false,
		page: 1,
		type: ''
	}
	getMovies = (query, page, type, currentMovies = []) => {
		this.setState({
			loading: true,
			movies: currentMovies
		});
		$.get('http://www.omdbapi.com/?page=' + page + '&s=' + query + '&type=' + type, (result) => {
			this.setState({
				movies: currentMovies.concat(result.Search),
				loading: false,
				query: query,
				page: page,
				type: type
			});
		});
	}
	handleQuerySubmit = (query, type) => {
		this.getMovies(query, 1, type);
	}
	handleShowMoreClick = page => {
		this.getMovies(this.state.query, page, this.state.type, this.state.movies);
	}
  render() {
    return (
    	<div className="app">
	    	<SearchBar onQuerySubmit={this.handleQuerySubmit} />
	    	<div className="container">
	      	<MovieList movies={this.state.movies} />
	      	<div className="show-more-container">
	      		<InfiniteScroll
	      			loading={this.state.loading}
	      			hasMovies={this.state.movies.length}
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
