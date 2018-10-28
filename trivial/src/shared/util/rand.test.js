import test from 'blue-tape';
import { randomId } from './rand.js';

test('randomId()', async t => {
	const a = randomId();
	const b = randomId(16);
	const c = randomId(4, 'XY');

	t.equal(typeof a, 'string', 'should return a string');
	t.equal(a.length, 4, 'should use default length');

	t.equal(typeof b, 'string', 'should return a string');
	t.equal(b.length, 16, 'should use custom length');

	t.equal(/^[XY]{4}$/.test(c), true, 'should use custom charset');
});
