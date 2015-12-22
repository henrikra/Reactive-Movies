import React, { Component } from 'react';
var $ = require('jquery');

export default class MovieModal extends Component {
	state = {
		movie: {},
		modalOpen: this.props.modalOpen
	}
	componentDidMount() {
		$.get('http://www.omdbapi.com/?i=' + this.props.movieId, function(result) {
			var movieCover;
			if (result.Poster == 'N/A') {
				movieCover = 'https://placeholdit.imgix.net/~text?txtsize=33&txt=200%C3%97300&w=200&h=300';
			} else {
				movieCover = result.Poster;
			}
			var coverStyle = {
				backgroundImage: 'url(' + movieCover + ')'
			};
			this.setState({
				movie: result,
				moviePoster: coverStyle
			});
		}.bind(this));
	}
	getModalState() {
		console.log("modaalin tila " + this.state.modalOpen);
		var modalState = '';
		if (this.state.modalOpen) {
			modalState = ' open';
		}
		return 'movie-modal' + modalState;
	}
	closeModal = event => {
		console.log("suljetaan modaali");
		this.setState({
			modalOpen: false
		});
	}
	componentWillReceiveProps = (nextProps) => {
		this.setState({
			modalOpen: nextProps.modalOpen
		});
		console.log(nextProps);
	}
	render() {
		return (
			<div className={this.getModalState()}>
				<div className="movie-modal--box">
					<div className="row row--no-gutter">
						<div className="col col--4-of-12">
							<div className="movie-modal--poster-container">
								<div className="movie-modal--poster" style={this.state.moviePoster} />
							</div>
						</div>
						<div className="col col--8-of-12">
							<div className="movie-modal--decription-container">
								<h3 className="movie-modal--header">{this.state.movie.Title} ({this.state.movie.Year})</h3>
								<div className="movie-modal--imdb-review">
									<span className="movie-modal--imdb-rating">{this.state.movie.imdbRating}</span>
									<span className="movie-modal--imdb-votes">{this.state.movie.imdbVotes}</span>
								</div>
								<p className="movie-modal--meta">
									<span className="movie-modal--rated">{this.state.movie.Rated}</span>
									<span className="movie-modal--runtime">{this.state.movie.Runtime}</span>
								</p>
								
								<hr className="movie-modal--hr" />
								<p className="movie-modal--plot">{this.state.movie.Plot}</p>
								<p className="movie-modal--crew"><span className="movie-modal--crew-label">Director:</span> {this.state.movie.Director}</p>
								<p className="movie-modal--crew"><span className="movie-modal--crew-label">Actors:</span> {this.state.movie.Actors}</p>
								<button className="movie-modal--close-btn" type="button" onClick={this.closeModal}>Close</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}