import deduce from 'deduce';
import * as reducers from './reducers.js';

export default function createStore(initialState) {
	return deduce({}, reducers).init(initialState);
}
