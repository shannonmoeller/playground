import test from 'blue-tape';
import {
	init,
	addPlayer,
	setPlayerName,
	setPlayerScore,
	removePlayer,
	addAnswer,
	setAnswerCorrect,
	removeAnswer,
	scoreQuestion,
	completeQuestion,
} from './reducers.js';

function setup(initialState) {
	return init({}, initialState);
}

test('init()', async t => {
	const a = init();
	const b = init(null, { foo: 'bar' });

	t.equal(typeof a, 'object', 'should create a game object');
	t.equal(b.foo, undefined, 'should disallow non game properties');

	t.throws(() => init(null, { id: undefined }), 'should enforce type');
});

test('addPlayer()', async t => {
	let game = setup();

	game = addPlayer(game, 'BERT', 'Bertie');

	t.deepEqual(
		game.players,
		[{ id: 'BERT', name: 'Bertie', score: 0 }],
		'should add player'
	);

	game = addPlayer(game, 'WERT', 'Qwerty');

	t.deepEqual(
		game.players,
		[
			{ id: 'BERT', name: 'Bertie', score: 0 },
			{ id: 'WERT', name: 'Qwerty', score: 0 },
		],
		'should add another player'
	);

	game = addPlayer(game, 'BERT', 'Bertram');

	t.deepEqual(
		game.players,
		[
			{ id: 'WERT', name: 'Qwerty', score: 0 },
			{ id: 'BERT', name: 'Bertram', score: 0 },
		],
		'should replace a player'
	);
});

test('setPlayerName()', async t => {
	let game = setup({
		players: [
			{ id: 'BERT', name: 'Bertie', score: 0 },
			{ id: 'WERT', name: 'Qwerty', score: 0 },
		],
	});

	game = setPlayerName(game, 'BERT', 'Bertram');

	t.deepEqual(
		game.players,
		[
			{ id: 'BERT', name: 'Bertram', score: 0 },
			{ id: 'WERT', name: 'Qwerty', score: 0 },
		],
		'should change player name'
	);
});

test('setPlayerScore()', async t => {
	let game = setup({
		players: [
			{ id: 'BERT', name: 'Bertie', score: 0 },
			{ id: 'WERT', name: 'Qwerty', score: 0 },
		],
	});

	game = setPlayerScore(game, 'BERT', 20);

	t.deepEqual(
		game.players,
		[
			{ id: 'BERT', name: 'Bertie', score: 20 },
			{ id: 'WERT', name: 'Qwerty', score: 0 },
		],
		'should change player score'
	);
});

test('removePlayer()', async t => {
	let game = setup({
		players: [
			{ id: 'BERT', name: 'Bertie', score: 0 },
			{ id: 'WERT', name: 'Qwerty', score: 0 },
		],
	});

	game = removePlayer(game, 'BERT');

	t.deepEqual(
		game.players,
		[{ id: 'WERT', name: 'Qwerty', score: 0 }],
		'should remove player'
	);
});

test('addAnswer()', async t => {
	let game = setup();

	game = addAnswer(game, 'WERT', 'them');

	t.deepEqual(
		game.currentAnswers,
		[{ playerId: 'WERT', answer: 'them', isCorrect: null }],
		'should add answer'
	);

	game = addAnswer(game, 'BERT', 'then');

	t.deepEqual(
		game.currentAnswers,
		[
			{ playerId: 'WERT', answer: 'them', isCorrect: null },
			{ playerId: 'BERT', answer: 'then', isCorrect: null },
		],
		'should add another answer'
	);

	game = addAnswer(game, 'WERT', 'here');

	t.deepEqual(
		game.currentAnswers,
		[
			{ playerId: 'BERT', answer: 'then', isCorrect: null },
			{ playerId: 'WERT', answer: 'here', isCorrect: null },
		],
		'should replace answer'
	);

	t.equal(typeof game, 'object', 'should create a game object');
});

test('setAnswerCorrect()', async t => {
	let game = setup({
		currentAnswers: [
			{ playerId: 'BERT', answer: 'then', isCorrect: null },
			{ playerId: 'WERT', answer: 'here', isCorrect: null },
		],
	});

	game = setAnswerCorrect(game, 'BERT');

	t.deepEqual(
		game.currentAnswers,
		[
			{ playerId: 'BERT', answer: 'then', isCorrect: true },
			{ playerId: 'WERT', answer: 'here', isCorrect: null },
		],
		'should mark answer correct'
	);

	game = setAnswerCorrect(game, 'WERT', false);

	t.deepEqual(
		game.currentAnswers,
		[
			{ playerId: 'BERT', answer: 'then', isCorrect: true },
			{ playerId: 'WERT', answer: 'here', isCorrect: false },
		],
		'should mark answer correct'
	);
});

test('removeAnswer()', async t => {
	let game = setup({
		currentAnswers: [
			{ playerId: 'BERT', answer: 'then', isCorrect: null },
			{ playerId: 'WERT', answer: 'here', isCorrect: null },
		],
	});

	game = removeAnswer(game, 'BERT');

	t.deepEqual(
		game.currentAnswers,
		[{ playerId: 'WERT', answer: 'here', isCorrect: null }],
		'should mark answer correct'
	);
});

test('scoreQuestion()', async t => {
	const game = scoreQuestion(
		setup({
			players: [
				{ id: 'FDSA', name: 'Foo', score: 200 },
				{ id: 'HJKL', name: 'Bar', score: 0 },
				{ id: 'SDFG', name: 'Baz', score: -200 },
				{ id: 'ZXCV', name: 'Bat', score: 100 },
			],
			questions: [
				{ question: 'who', answer: 'him', points: 20 },
				{ question: 'what', answer: 'it', points: 40 },
				{ question: 'when', answer: 'now', points: 60 },
				{ question: 'where', answer: 'here', points: 80 },
				{ question: 'why', answer: 'cause', points: 100 },
			],
			currentAnswers: [
				{ playerId: 'FDSA', answer: 'now', isCorrect: null },
				{ playerId: 'SDFG', answer: 'now', isCorrect: true },
				{ playerId: 'HJKL', answer: 'then', isCorrect: false },
			],
		})
	);

	t.deepEqual(
		game.players,
		[
			{ id: 'FDSA', name: 'Foo', score: 200 },
			{ id: 'HJKL', name: 'Bar', score: -20 },
			{ id: 'SDFG', name: 'Baz', score: -180 },
			{ id: 'ZXCV', name: 'Bat', score: 100 },
		],
		'should update player scores'
	);

	t.equal(game.showAnswers, true, 'should show answers');
});

test('completeQuestion()', async t => {
	const game = completeQuestion(
		setup({
			currentAnswers: [
				{ playerId: 'SDFG', answer: 'now', isCorrect: true },
				{ playerId: 'HJKL', answer: 'then', isCorrect: false },
			],
			showAnswers: true,
		})
	);

	t.deepEqual(game.currentAnswers, [], 'should clear answers');
	t.equal(game.showAnswers, false, 'should hide answers');
});
