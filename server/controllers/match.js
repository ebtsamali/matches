const MatchModel = require('../models/match');

const getAllMatches = async (req, res) => {
	await MatchModel.find().then(matches => {
		if (matches.length === 0) {
			return res.status(404).send({message: 'No Matches Found'});
		}
		res.status(200).send(matches);
	}).catch(error => {
		console.log(error);
		res.status(500).send({ message: error })
	})
}

const getMatch = async (req, res) => {
	const matchId = req.params.matchId;
	await MatchModel.findById(matchId).then(match => {
		if (!match) {
			return res.status(404).send({message: 'Match not Found'});
		}
		res.status(200).send(match);
	}).catch(error => {
		console.log(error);
		res.status(500).send({ message: error })
	})
}

const addMatch = async (req, res) => {
	const { 
		body: { homeTeam, awayTeam, startTime, endTime, duration, homeTeamScore, awayTeamScore, status, league }
	} = req;

	let newMatch = new MatchModel({
		homeTeam,
		awayTeam,
		startTime,
		endTime,
		duration,
		homeTeamScore,
		awayTeamScore,
		status,
		league
	});

	try{
		await newMatch.save().then(() => {
			res.status(201).send({message: 'Match added successfully'});
		}).catch(() => {
			res.status(500).send({ message: 'Failed to Save Match, Try Again!' });
		})
	} catch(err) {
		res.status(500).send({ message: 'Failed to Save Match, Try Again!' });
	}
}

const updateMatch = async (req, res) => {
	const matchId = req.params.matchId;
	const { 
		body: { homeTeam, awayTeam, startTime, endTime, duration, homeTeamScore, awayTeamScore, status, league }
	} = req;

	await MatchModel.findById(matchId).then(match => {
		match.homeTeam = homeTeam;
		match.awayTeam = awayTeam;
		match.startTime = startTime;
		match.endTime = endTime;
		match.duration = duration;
		match.homeTeamScore = homeTeamScore;
		match.awayTeamScore = awayTeamScore;
		match.status = status;
		match.league = league;

		match.save()
			.then(() => res.status(200).send({message: 'match updated successfully'}))
			.catch(error => res.status(500).send({message: error}))

	}).catch(err => res.status(500).send(err))
}

const deleteMatch = async (req, res) => {
	const matchId = req.params.matchId;
	await MatchModel.findByIdAndRemove(matchId).then(match => {
		if(!match) {
			res.status(404).end();
		}
		res.status(200).send({message: 'Match Deleted successfully'});
	}).catch(error => res.status(500).send({message: 'Error while deleting'}))
}

module.exports = {
	getAllMatches,
	getMatch,
	addMatch,
	updateMatch,
	deleteMatch
}