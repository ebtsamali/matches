import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { Col, Row } from 'react-bootstrap';
import '../styles/filterForm.scss';

class FilterForm extends Component {

	constructor (props) {
		super(props);
		this.state = {
			searchValue: '',
			startDate: '',
			endDate: '',
		}
	}

	handleFilterByName = (value) => {
		this.setState({
			searchValue: value
		});
		this.props.filterByName(value);
	}

	handleFilterByDate = (property, value) => {
		this.setState({
			[property]: value
		});
		this.props.filterByDate(property, value);
	}

	handleShowAll = () => {
		this.props.showAllMatches();
		this.setState({
			searchValue: '',
			startDate: '',
			endDate: '',
		})
	}

	render() {
		return (
			<div id='filter-form'>
				<div className='date-filter'>
					<label>Filter By Date </label>
					<Row>
						<Col md={3}>
							<DatePicker
								className="form-control" 
								selected={this.state.startDate}
								onChange={date => this.handleFilterByDate('startDate' ,date)}
								placeholderText='From ...'
								dateFormat="MM/dd/yyyy"
							/>
						</Col>
						<Col md={3}>
							<DatePicker
								className="form-control" 
								selected={this.state.endDate}
								onChange={date => this.handleFilterByDate('endDate' ,date)}
								placeholderText='To ...'
								dateFormat="MM/dd/yyyy"
							/>
						</Col>
						<Col md={3}>
							<button className="form-control all-matches" onClick={this.handleShowAll}> Show All</button>
						</Col>
					</Row>
				</div>

				<Col md={3} className='search'>
					<input 
						type='text'
						name='searchValue' 
						className="form-control" 
						placeholder='Search By Team Name ...' 
						value={this.state.searchValue} 
						onChange={event => this.handleFilterByName(event.target.value)}
					/>
				</Col>
			</div>
		);
	}
}

FilterForm.propTypes = {
	filterByName: PropTypes.func.isRequired,
	filterByDate: PropTypes.func.isRequired,
	showAllMatches: PropTypes.func.isRequired
}

export default FilterForm;