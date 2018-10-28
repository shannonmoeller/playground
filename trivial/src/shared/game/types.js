import t from 'tcomb';

export const GamePlayer = t.struct(
	{
		id: t.String,
		name: t.String,
		score: t.Number,
	},
	'GamePlayer'
);

export const GamePlayers = t.list(GamePlayer, 'GamePlayers');

export const GameQuestion = t.struct(
	{
		question: t.String,
		answer: t.String,
		points: t.Number,
	},
	'GameQuestion'
);

export const GameQuestions = t.list(GameQuestion, 'GameQuestions');

export const GameAnswer = t.struct(
	{
		playerId: t.String,
		answer: t.String,
		isCorrect: t.maybe(t.Boolean),
	},
	'GameAnswer'
);

export const GameAnswers = t.list(GameAnswer, 'GameAnswers');

export const Game = t.struct(
	{
		id: t.String,
		players: GamePlayers,
		questions: GameQuestions,
		currentQuestionIndex: t.Number,
		currentAnswers: GameAnswers,
		showAnswers: t.Boolean,
	},
	'Game'
);
