const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const mysql = require("mysql2");

const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	database: "files_db",
	password: "Gjm12!bd5.",
	waitForConnections: true,
	connectionLimit: 10,
	maxIdle: 10,
	idleTimeout: 60000,
	queueLimit: 0,
});

app.use(cors());

app.get("/", function (req, res) {
	res.json({ msg: "hi!" });
});

app.get("/files", function (req, res) {
	pool.query("SELECT * FROM files", function (err, rows, fields) {
		if (err) console.error(err);
		res.json(rows);
	});
});

app.listen(PORT, function () {
	console.log("server listening on port ", PORT);
});
