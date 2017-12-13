import React, { Component } from 'react';
import MovieModal from './MovieModal';

import {apiKey} from '../apiKey';

export default class MovieCard extends Component {
	state = {
		modalOpen: false
	}
	showDetails = (event) => {
		event.preventDefault();
		document.body.classList.add('modal-open');
		this.setState({modalOpen: true});
	}
	handleModalClose = () => {
		this.setState({modalOpen: false});
	}
	render() {
		var movieCover;
		if (this.props.movie.Poster == 'N/A') {
			movieCover = 'https://placeholdit.imgix.net/~text?txtsize=33&txt=No%20poster&w=200&h=300';
		} else {
			movieCover = 'http://img.omdbapi.com/?i=' + this.props.movie.imdbID + '&apikey=' + apiKey + '&h=300';
		}
		var coverStyle = {
			backgroundImage: 'url(' + movieCover + ')'
		};
		return (
			<div className="col col--1-of-5 col--m-1-of-2">
				<a href="#" className="movie-card" onClick={this.showDetails}>
					<div className="movie-card--cover" style={coverStyle} />
					<div className="movie-card--content">
						<h4 className="movie-card--title">{this.props.movie.Title}</h4>
						<p className="movie-card--year">{this.props.movie.Year}</p>
					</div>
				</a>
				<MovieModal
					movieId={this.props.movie.imdbID}
					modalOpen={this.state.modalOpen}
					onModalClose={this.handleModalClose}
				/>
			</div>
		);
	}
}