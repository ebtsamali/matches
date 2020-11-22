const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
	homeTeam: {
		type: String, 
		required: [true, "HomeTeam is required"], 
	},
	awayTeam: {
		type: String, 
		required: [true, "AwayTeam is required"], 
	},
	startTime: {
		type: Date, 
		required: [true, "Start time is required"],
	},
	endTime: {
		type: Date, 
		required: [true, "End time is required"],
	},
	duration: {
		type: Number, 
		required: [true, "Match duration is required"],
	},
	homeTeamScore: {
		type: Number, 
		required: [true, "HomeTeam Score is required"],
	},
	awayTeamScore: {
		type: Number, 
		required: [true, "AwayTeam Score is required"],
	},
	status: {
		type: String, 
		required: [true, "Match status is required"],
	},
	league: {
		type: String, 
		required: [true, "League is required"],
	},
}, {
    timestamps: true,
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;