import React, { Component } from 'react';

export default class ResultsHeader extends Component {
	render() {
		var resultsHeader;
		if (this.props.error) {
			resultsHeader = <h2>No results for: "{this.props.query}" :(</h2>;
		} else {
			resultsHeader = <h2>Results for: "{this.props.query}"</h2>;
		}
		return (
			<div className="results-header">
				{resultsHeader}
			</div>
		);
	}
}