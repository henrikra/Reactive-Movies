import React, { Component } from 'react';
import $ from 'jquery';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import InfiniteScroll from './InfiniteScroll';
import ResultsHeader from './ResultsHeader';

require('../styles/style.scss');

export default class App extends Component {
	state = {
		movies: [],
		loading: false,
		page: 1,
		type: '',
		error: ''
	}
	getMovies = (query, page, type, currentMovies = []) => {
		this.setState({
			loading: true,
			movies: currentMovies
		});
		$.get('http://www.omdbapi.com/?page=' + page + '&s=' + query + '&type=' + type, (result) => {
			if (result.Search) {
				this.setState({
					movies: currentMovies.concat(result.Search),
					loading: false,
					query: query,
					page: page,
					type: type,
					error: ''
				});
			} else {
				this.setState({
					error: result.Error,
					query: query,
					loading: false
				});
			}
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
	    	<SearchBar
	    		onQuerySubmit={this.handleQuerySubmit}
	    		loading={this.state.loading}
	    	/>
	    	<div className="container">
	    		<ResultsHeader
	    			error={this.state.error}
	    			query={this.state.query}
	    			hasMovies={this.state.movies.length}
	    		/>
	      	<MovieList movies={this.state.movies} />
	      	<div className="show-more-container">
	      		<InfiniteScroll
	      			loading={this.state.loading}
	      			movieCount={this.state.movies.length}
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
