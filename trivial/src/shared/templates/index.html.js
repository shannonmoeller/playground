import { html } from 'apply-html';

export default () => html`
	<!doctype html>
	<html lang="en">
		<head>
			<meta charset="utf-8" />
			<title>Trivial</title>
			<script type="module" src="/client/js/bundle.js"></script>
			<link rel="stylesheet" href="/client/css/bundle.css" />
		</head>
		<body>
			<tv-app></tv-app>
		</body>
	</html>
`;
