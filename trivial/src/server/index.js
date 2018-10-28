import Koa from 'koa';
import config from 'config';
import helmet from 'koa-helmet';
import mount from 'koa-mount';
import serve from 'koa-static';
import websocket from 'koa-websocket';

import renderIndex from '../shared/templates/index.html.js';

function onRequest({ request, response }) {
	console.log('request', request.url);

	if (!request.headers.accept.includes('html')) {
		response.status = 404;

		return;
	}

	response.body = String(renderIndex());
}

function onUpgrade({ request, websocket }) {
	console.log('connect', request.url);

	websocket.on('message', data => {
		console.log('message', data);
	});

	websocket.on('error', error => {
		console.log('error', error);
	});

	websocket.on('close', () => {
		console.log('close');
	});

	websocket.send('Hello Client!');
}

export function createServer() {
	const app = new Koa();

	websocket(app);

	app
		.use(helmet())
		.use(helmet.contentSecurityPolicy(config.get('server.csp')))
		.use(mount('/client', serve('./src/client')))
		.use(onRequest);

	app.ws.use(onUpgrade);

	return app;
}
