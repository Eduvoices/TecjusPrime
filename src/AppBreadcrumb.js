import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class AppBreadcrumb extends Component {

	static propTypes = {
		match: PropTypes.object
	}

	render() {
		const {location} = this.props;
		const paths = location.pathname.split('/');
		return (
			<div className="route-bar">
				<div className="route-bar-breadcrumb">
					<ul>
						<li><a><i className="pi pi-home"/></a></li>
						{
							location.pathname === '/' ? <li>/</li> : paths.map((path, index) => <li key={index}>{path === '' ? '/' : path}</li>)
						}
					</ul>
				</div>
			</div>
		);
	}
}