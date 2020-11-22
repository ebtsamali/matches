import React, { useState } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import matchesAPI from '../API/matchesAPI';
import '../styles/matchesTable.scss';

function MatchesTable(props) {
	const [show, setShow] = useState(false);
	const [matchId, setMatchId] = useState('');
	const { matches, deleteMatch } = props;

	const handleClose = () => setShow(false);
  	const handleShow = (id) => {
		setShow(true);
		setMatchId(id);
	};

	// solit date
	const splitDate = (date) => {
		const dateArr = date.split('T');
		return dateArr;
	}

	// delete match
	const handleDelete = () => {
		handleClose();
		matchesAPI.deleteMatch(matchId).then(res => {
			if (res.statusText === 'OK') {
				deleteMatch(matchId)
			}
		}).catch(error => {
			console.log(error);
		})
	}

	return (
		<div id='matches-table'>
			<Table>
				<thead>
					<tr>
						<th>HomeTeam</th>
						<th>AwayTeam</th>
						<th>Start Time</th>
						<th>End Time</th>
						<th>Duration</th>
						<th>HomeTeam Score</th>
						<th>AwayTeam Score</th>
						<th>Status</th>
						<th>League</th>
						<th colSpan="2"><span className="material-icons">settings</span></th>
					</tr>
				</thead>
				{matches.length > 0 && <tbody>
					{ matches.map(match => {
						const startTime = splitDate(match.startTime);
						const endTime = splitDate(match.endTime);
						return (
							<tr key={match._id}>
								<td>{match.homeTeam}</td>
								<td>{match.awayTeam}</td>
								<td>{startTime[0]} {startTime[1]}</td>
								<td>{endTime[0]} {endTime[1]}</td>
								<td>{match.duration}</td>
								<td>{match.homeTeamScore}</td>
								<td>{match.awayTeamScore}</td>
								<td>{match.status}</td>
								<td>{match.league}</td>
								<td> <Link to={{pathname: `/matches/update/${match._id}`}}>
									<span className="material-icons edit">edit</span> 
								</Link></td>
								<td onClick={() => handleShow(match._id)}> <span className="material-icons delete">delete</span> </td>
							</tr>
						);
					})}
				</tbody>}
			</Table>

			<Modal show={show} onHide={handleClose}>
				<Modal.Body>Match will be deleted permentaly </Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleDelete}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

MatchesTable.propTypes = {
	matches: PropTypes.array.isRequired,
	deleteMatch: PropTypes.func.isRequired
}

export default MatchesTable;