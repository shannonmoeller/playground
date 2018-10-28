import { randomId } from '../util/rand.js';
import { Game } from './types.js';

// Game

export function init(state, initialState) {
	return Game({
		id: randomId(),
		players: [],
		questions: [],
		currentQuestionIndex: 0,
		currentAnswers: [],
		showAnswers: false,

		...initialState,
	});
}

// Players

export function addPlayer(state, id, name) {
	return Game({
		...state,
		players: state.players
			// Remove existing
			.filter(player => player.id !== id)
			// Add new
			.concat({
				id,
				name,
				score: 0,
			}),
	});
}

export function setPlayerName(state, id, name) {
	return Game({
		...state,
		players: state.players.map(player => {
			if (player.id !== id) {
				return player;
			}

			return {
				...player,
				name,
			};
		}),
	});
}

export function setPlayerScore(state, id, score) {
	return Game({
		...state,
		players: state.players.map(player => {
			if (player.id !== id) {
				return player;
			}

			return {
				...player,
				score,
			};
		}),
	});
}

export function removePlayer(state, id) {
	return Game({
		...state,
		players: state.players.filter(player => player.id !== id),
	});
}

// Answers

export function addAnswer(state, playerId, answer) {
	return Game({
		...state,
		currentAnswers: state.currentAnswers
			// Remove existing
			.filter(answer => answer.playerId !== playerId)
			// Add new
			.concat({
				playerId,
				answer,
				isCorrect: null,
			}),
	});
}

export function setAnswerCorrect(state, playerId, isCorrect = true) {
	return Game({
		...state,
		currentAnswers: state.currentAnswers.map(answer => {
			if (answer.playerId !== playerId) {
				return answer;
			}

			return {
				...answer,
				isCorrect,
			};
		}),
	});
}

export function removeAnswer(state, playerId) {
	return Game({
		...state,
		currentAnswers: state.currentAnswers.filter(
			answer => answer.playerId !== playerId
		),
	});
}

// Questions

export function scoreQuestion(state) {
	const { points } = state.questions[state.currentQuestionIndex];

	const correctOrNot = state.currentAnswers.reduce((obj, answer) => {
		const { isCorrect } = answer;

		if (typeof isCorrect === 'boolean') {
			obj[answer.playerId] = isCorrect;
		}

		return obj;
	}, {});

	const scoredPlayers = state.players.map(player => {
		const { id, score } = player;

		if (!correctOrNot.hasOwnProperty(id)) {
			return player;
		}

		return {
			...player,
			score: score + (correctOrNot[id] ? points : -points),
		};
	});

	return Game({
		...state,
		players: scoredPlayers,
		showAnswers: true,
	});
}

export function completeQuestion(state) {
	return Game({
		...state,
		currentQuestionIndex: state.currentQuestionIndex + 1,
		currentAnswers: [],
		showAnswers: false,
	});
}
