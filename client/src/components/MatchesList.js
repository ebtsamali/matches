import React, { Component } from 'react';
import MatchesTable from './MatchesTable';
import FilterForm from './FilterForm';
import matchesAPI from '../API/matchesAPI';

class MatchesList extends Component {
	constructor (props) {
		super(props);
		this.state = {
			matches: [],
			showingMatches: [],
			startDate: '',
			endDate: '',
		}
	}

	componentDidMount () {
		//get all matches
		matchesAPI.getAllMatches().then(res => {
			const allMatches = res.data;
			if(allMatches.length > 0) {
				this.setState({
					matches: allMatches,
					showingMatches: allMatches
				})
			}
		}).catch(error => {
			console.log(error);
		})
	}

	// delete match
	deleteMatch = (matchId) => {
		const filteredMatches = this.state.matches.filter(match => match._id !== matchId);
		this.setState({
			matches: filteredMatches,
			showingMatches: filteredMatches
		})
	}

	//show all matches
	showAllMatches = () => {
		this.setState(currentState => ({
			showingMatches: currentState.matches
		}))
	}

	// filter matches by team name
	filterByName = (value) => {
		const filteredMatches = value === ''
			? this.state.matches
			: this.state.matches.filter(match => match.homeTeam.toLowerCase().includes(value.toLocaleLowerCase()) ||
				match.awayTeam.toLowerCase().includes(value.toLocaleLowerCase())
			)

		this.setState({ showingMatches: filteredMatches })
	}

	// filter matches by date range
	filterByDateRange = (startDate, endDate) => {
		const filteredMatches = this.state.matches.filter(match => {
			const startTime = new Date(match.startTime);
			const endTime = new Date(match.endTime);
			return (
				(startTime.getTime() >= startDate.getTime() && startTime.getTime() <= endDate.getTime()) || 
				(endTime.getTime() >= startDate.getTime() && endTime.getTime() <= endDate.getTime())
			);
		});
		return filteredMatches;
	}

	filterByDate = (property, dateValue) => {
		this.setState({ [property]: dateValue });
		const { matches } = this.state;
		let filteredMatches;

		if(property === 'startDate') {
			// check if end date was entered before
			if(this.state.endDate !== '') {
				filteredMatches = this.filterByDateRange(dateValue, this.state.endDate);
			} else {    // if end date was not entered before, get all matches their time greater than start date
				filteredMatches = matches.filter(match => {
					const startTime = new Date(match.startTime);
					const endTime = new Date(match.endTime);
					return startTime.getTime() >= dateValue.getTime() || endTime.getTime() >= dateValue.getTime() ;
				});
			}
		}
		if (property === 'endDate') {
			// check if start date was entered before
			if(this.state.startDate !== '') {
				filteredMatches = this.filterByDateRange(this.state.startDate, dateValue);
			} else {     // if start date was not entered before, get all matches their time less than end date
				filteredMatches = matches.filter(match => {
					const startTime = new Date(match.startTime);
					const endTime = new Date(match.endTime);
					return startTime.getTime() <= dateValue.getTime() || endTime.getTime() <= dateValue.getTime() ;
				});
			}
		}
		this.setState({ showingMatches: filteredMatches });
	}

	render() {
		return (
			<div id='matches-list'>
				<FilterForm 
					filterByName={this.filterByName} 
					filterByDate={this.filterByDate} 
					showAllMatches={this.showAllMatches}
				/>

				<MatchesTable matches={this.state.showingMatches} deleteMatch={this.deleteMatch}/>
			</div>
		);
	}
}

export default MatchesList;