const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static("public"));

app.use('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(3000);