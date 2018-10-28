/**
 * Generates random IDs. Default parameters should create human-friendly
 * non-offensive four-character IDs. Think of the children.
 */
export function randomId(length = 4, chars = 'BCDGJLMNPQRSWXYZ') {
	const base = chars.length;
	let id = '';

	for (; length > 0; length--) {
		id += chars.charAt(Math.floor(Math.random() * base));
	}

	return id;
}
