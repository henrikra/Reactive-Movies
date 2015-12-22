import React, { Component } from 'react';
import MovieCard from './MovieCard';

export default class SearchResults extends Component {
	render() {
		return (
			<div className="search-results">
				<div className="row">
					{this.props.movies.map(function(movie) {
						return (
							<MovieCard movie={movie} />
						);
					})}
				</div>
			</div>
		);
	}
}