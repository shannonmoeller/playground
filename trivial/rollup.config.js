import camelCase from 'lodash.camelcase';
import istanbul from 'rollup-plugin-istanbul';
import isomorphic from 'rollup-preset-isomorphic';
import pkg from './package.json';

const plugins = [...isomorphic()];

if (process.env.NODE_ENV === 'test') {
	plugins.push(
		istanbul({
			exclude: pkg.nyc.ignore,
		})
	);
}

export default {
	output: {
		format: 'iife',
		name: camelCase(pkg.name),
		globals: Object.keys(pkg.dependencies).reduce(
			(a, b) => Object.assign(a, { [b]: camelCase(b) }),
			{}
		),
	},
	plugins,
};
