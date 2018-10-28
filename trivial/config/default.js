module.exports = {
	server: {
		port: 80,
		csp: {
			directives: {
				connectSrc: ["'self'", 'ws:'],
				imgSrc: ["'self'", 'data:'],
				defaultSrc: ["'self'"],
			},
		},
	},
};
