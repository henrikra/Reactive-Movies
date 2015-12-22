import React, { Component } from 'react';
import MovieCard from './MovieCard';

export default class SearchResults extends Component {
	render() {
		var movieNodes = this.props.movies.map(function(movie) {
			return (
				<MovieCard movie={movie} />
			);
		});
		return (
			<div className="search-results">
				<div className="row">
					{movieNodes}
				</div>
			</div>
		);
	}
}