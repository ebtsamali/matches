import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import AlertMessage from './Alert';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import matchesAPI from '../API/matchesAPI';
import '../styles/matchForm.scss';

class MatchForm extends Component {

	constructor (props) {
		super(props);
		this.state = {
			_id: '',
			homeTeam: '',
			awayTeam: '',
			startTime: '',
			endTime: '',
			duration: '',
			homeTeamScore: '',
			awayTeamScore: '',
			status: '',
			league: '',
			errors: {},
			message: '',
			style: '',
		}
	}

	componentDidMount () {
		const { match } = this.props;
		// if FromPath is 'matches/update/:matchId' (user wants update match)
		if (match.path.endsWith('update/:matchId')) {
			matchesAPI.getMatch(match.params.matchId).then(res => {
				if (res.statusText === 'OK') {
					const matchData = res.data;
					for (const property in matchData) {
						if(property === 'startTime' || property === 'endTime') {
							const value = new Date(matchData[property]);
							this.onValueChange(property, value);
						} else {
							this.onValueChange(property, matchData[property]);
						}
					}
				}
			}).catch(error => {
				console.log(error);
			})
		}
	}

	// handle change input value 
	onValueChange = (property, value) => {
		this.setState({
			[property]: value
		})
		// if this input has error remove it when start entering value
		if (this.state.errors[property]) {
			this.setState(prevState => ({
				errors: {...prevState.errors, [property]: ''}
			}))
		}
	}

	// check if all inputs have values
	checkValidity = (data) => {
		let valid = true;
		for (const property in data) {
			if (data[property] === '') {
				valid = false;
				this.setState(prevState => ({
					errors: {...prevState.errors, [property]: `${property} is required`}
				}))
			}
		}
		return valid;
	}

	// set server errors to show
	handleServerError = () => {
		this.setState({
			message: 'Failed to Save Match, Try Again!',
			style: 'faild'
		})
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const { match, history } = this.props;
		const matchData = {
			homeTeam: this.state.homeTeam,
			awayTeam: this.state.awayTeam,
			startTime: this.state.startTime,
			endTime: this.state.endTime,
			duration: this.state.duration,
			homeTeamScore: this.state.homeTeamScore,
			awayTeamScore: this.state.awayTeamScore,
			status: this.state.status,
			league: this.state.league
		}

		// check if all inputs have values
		if (!this.checkValidity(matchData)) {
			return;
		}

		// if FromPath is 'matches/update/:matchId' (user wants update match)
		if (match.path.endsWith('update/:matchId')) {
			matchesAPI.updateMatch(this.state._id, matchData).then(res => {
				if(res.statusText === 'OK') {
					history.push('/matches/all');
				} else {
					this.handleServerError();  // if faild to update match
				}
			}).catch(error => {
				console.log(error);
				this.handleServerError();
			})
		} else {    // if FromPath is 'matches/add' (user wants add new match)
			matchesAPI.addMatch(matchData).then(res => {
				this.setState({
					message: res.data.message,
					style: 'success'
				})
				// reset all form inputs
				for (const property in matchData) {
					this.onValueChange(property, '');
				}
			}).catch(error => {
				console.log(error);
				this.handleServerError();
			})
		}
	}

	render() {
		const size = 3;
		const { errors, message, style } = this.state;

		return (
			<form id="match-form" onSubmit={this.handleSubmit}>
				{ message !== '' && <AlertMessage message={message} style={style} /> }
				<Card className="card">
					<Row className="form-group">
						<h3>Match Data</h3>
					</Row>

					<Row className="form-group">
						<Col md={size}>
							<input 
								type='text' 
								name='homeTeam' 
								className="form-control" 
								placeholder='HomeTeam' 
								value={this.state.homeTeam} 
								onChange={event => this.onValueChange('homeTeam', event.target.value)} 
							/>
							{errors.homeTeam && <p className='error'>{errors.homeTeam}</p>}
						</Col>

						<Col md={size}>
							<input 
								type='text'
								name='awayTeam' 
								className="form-control" 
								placeholder='AwayTeam' 
								value={this.state.awayTeam} 
								onChange={event => this.onValueChange('awayTeam', event.target.value)} 
							/>
							{errors.awayTeam && <p className='error'>{errors.awayTeam}</p>}
						</Col>
						
						<Col md={size}>
							<DatePicker
								className="form-control date" 
								selected={this.state.startTime}
								onChange={date => this.onValueChange('startTime' ,date)}
								timeInputLabel='Time:'
								placeholderText='Match Start Time'
								dateFormat="MM/dd/yyyy h:mm aa"
								showTimeInput
							/>
							{errors.startTime && <p className='error'>{errors.startTime}</p>}
						</Col>

						<Col md={size}>
							<DatePicker
								className="form-control date" 
								selected={this.state.endTime}
								onChange={date => this.onValueChange('endTime' ,date)}
								timeInputLabel='Time:'
								placeholderText='Match End Time'
								dateFormat="MM/dd/yyyy h:mm aa"
								showTimeInput
							/>
							{errors.endTime && <p className='error'>{errors.endTime}</p>}
						</Col>

						<Col md={size}>
							<input 
								type='number' 
								min="0"
								name='duration' 
								className="form-control" 
								placeholder='Match Duration in minutes' 
								value={this.state.duration} 
								onChange={event => this.onValueChange('duration', event.target.value)} 
							/>
							{errors.duration && <p className='error'>{errors.duration}</p>}
						</Col>

						<Col md={size}>
							<input 
								type='number' 
								min="0"
								name='homeTeamScore' 
								className="form-control" 
								placeholder='HomeTeam Score' 
								value={this.state.homeTeamScore} 
								onChange={event => this.onValueChange('homeTeamScore', event.target.value)} 
							/>
							{errors.homeTeamScore && <p className='error'>{errors.homeTeamScore}</p>}
						</Col>

						<Col md={size}>
							<input 
								type='number' 
								min="0"
								name='awayTeamScore' 
								className="form-control" 
								placeholder='AwayTeam Score' 
								value={this.state.awayTeamScore} 
								onChange={event => this.onValueChange('awayTeamScore', event.target.value)} 
							/>
							{errors.awayTeamScore && <p className='error'>{errors.awayTeamScore}</p>}
						</Col>

						<Col md={size}>
							<select 
								name='status' 
								className="form-control" 
								value={this.state.status} 
								onChange={event => this.onValueChange('status', event.target.value)}
							>
								<option value='' disabled>Match Status</option>
								<option value='is-active'>Is Active</option>
								<option value='finished'>Finished</option>
								<option value='will-start'>Will Start</option>
							</select>
							{errors.status && <p className='error'>{errors.status}</p>}
						</Col>

						<Col md={size}>
							<input 
								type='text' 
								name='league' 
								className="form-control" 
								placeholder='League' 
								value={this.state.league} 
								onChange={event => this.onValueChange('league', event.target.value)} 
							/>
							{errors.league && <p className='error'>{errors.league}</p>}
						</Col>
					</Row>
				</Card>

				<Row className="form-group btns">
					<Col md={2}>
						<Button type="submit" className="form-control btn" > Save </Button>
					</Col>
				</Row>
			</form>
		);
	}
}

export default MatchForm;