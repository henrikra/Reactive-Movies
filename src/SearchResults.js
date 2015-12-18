import React, { Component } from 'react';

export default class SearchResults extends Component {
	render() {
		return (
			<div className="row">
				{this.props.movies.map(function(movie) {
					var coverStyle = {
						backgroundImage: 'url(' + movie.Poster + ')'
					};
					return (
						<div className="movie-card col col--1-of-5">
							<div className="movie-card--cover" style={coverStyle} />
							<h4 className="movie-card--title">{movie.Title}</h4>
							<p className="movie-card--year">{movie.Year}</p>
						</div>
					);
				})}
			</div>
		);
	}
}