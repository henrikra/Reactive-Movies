import React, { Component } from 'react';
import MovieCard from './MovieCard';

export default class SearchResults extends Component {
	render() {
		const movieNodes = this.props.movies.map((movie) => 
			<MovieCard 
				key={movie.imdbID}
				movie={movie} 
			/>
		);
		return (
			<div className="search-results">
				<div className="row">
					{movieNodes}
				</div>
			</div>
		);
	}
}