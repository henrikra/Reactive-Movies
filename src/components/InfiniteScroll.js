import React, { Component } from 'react';

export default class InfiniteScroll extends Component {
	handleClick = () => {
		this.props.onShowMoreClick(this.props.page + 1);
	}
	render() {
		if (this.props.hasMovies) {
			var showMoreContent;
	  	if (this.props.loading) {
	  		showMoreContent = <img className="ajax-loader" src='http://static.hypable.com/wp-content/themes/hypable/images/ajax_loader_gray.gif' />
	  	} else {
	  		showMoreContent = <button onClick={this.handleClick} className="button show-more-btn" type="button">Show more</button>;
	  	}
  	}
		return (
			<div>
				{showMoreContent}
			</div>
		);
	}
}