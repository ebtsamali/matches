import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './shared/Header';
import MatchesList from './components/MatchesList';
import MatchForm from './components/MatchForm';
import './styles/main.scss';

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route exact path="/matches/all" component={MatchesList} />
				<Route exact path="/" component={MatchesList} />
				<Route exact path="/matches/add" component={MatchForm} />
				<Route exact path="/matches/update/:matchId" component={MatchForm} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
