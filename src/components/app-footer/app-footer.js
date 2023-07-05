import React, {Component} from 'react';
import './app-footer.css';

export default class AppFooter extends Component {
	render() {
		return (
			<div className={"app-footer"}>
				React training project by Pryada Mikhail
				<ul>
					<li>email: pryada16@gmail.com</li>
					<li>github: <a href={"https://github.com/pryadadev"}>pryadadev</a></li>
				</ul>
			</div>
		);
	}
}