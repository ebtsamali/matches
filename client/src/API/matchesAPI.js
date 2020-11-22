import axios from 'axios';
const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

function matchAPI () {
	return ({
		getAllMatches: () => {
			return axios({
				method: "GET",
				url: `${backendURL}/matches`
			});
		},
		addMatch: (data) => {
			return axios({
				method: "POST",
				url: `${backendURL}/matches`,
				data
			});
		},
		deleteMatch: (matchId) => {
			return axios({
				method: "DELETE",
				url: `${backendURL}/matches/${matchId}`,
			});
		},
		getMatch: (matchId) => {
			return axios({
				method: "GET",
				url: `${backendURL}/matches/${matchId}`,
			});
		},
		updateMatch: (matchId, data) => {
			return axios({
				method: "PATCH",
				url: `${backendURL}/matches/${matchId}`,
				data
			});
		}
	})
}

export default matchAPI();