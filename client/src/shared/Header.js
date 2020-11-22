import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.scss';

function Header () {
	return(
		<header>
			<Link to={{ pathname: '/matches/all' }}>Matches</Link>
			
			<div className='add-link'>
				<Link to={{ pathname: "/matches/add" }}>
					<div> <span className="material-icons">add</span> </div>
					<p>Add Match</p>
				</Link>
			</div>
		</header>
	);
}

export default Header;