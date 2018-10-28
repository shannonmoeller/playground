const websocket = new WebSocket(`ws://${location.host}`);

function onOpen(event) {
	console.log('open', event);

	websocket.addEventListener('message', event => {
		console.log('message', event.data);
	});

	websocket.addEventListener('error', error => {
		console.log('error', error);
	});

	websocket.addEventListener('close', () => {
		console.log('close');
	});

	websocket.send('Hello Server!');
}

websocket.addEventListener('open', onOpen);
