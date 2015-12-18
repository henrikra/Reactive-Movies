import React, { Component } from 'react';

export default class SearchResults extends Component {
	render() {
		return (
			<div className="row">
				{this.props.movies.map(function(movie) {
					var movieCover;
					if (movie.Poster == 'N/A') {
						movieCover = 'https://placeholdit.imgix.net/~text?txtsize=33&txt=200%C3%97300&w=200&h=300';
					} else {
						movieCover = movie.Poster;
					}
					var coverStyle = {
						backgroundImage: 'url(' + movieCover + ')'
					};
					return (
						<div className="col col--1-of-5 col--m-1-of-2">
							<a href="#" className="movie-card">
								<div className="movie-card--cover" style={coverStyle} />
								<div className="movie-card--content">
									<h4 className="movie-card--title">{movie.Title}</h4>
									<p className="movie-card--year">{movie.Year}</p>
								</div>
							</a>
						</div>
					);
				})}
			</div>
		);
	}
}