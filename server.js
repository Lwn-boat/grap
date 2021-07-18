const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening`));

function KeepAlive() {
	server.listen(3000, () => {
		console.log("readyyyyyyy")
	})
}

module.export = KeepAlive