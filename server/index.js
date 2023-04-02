const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const mysql = require("mysql2");
var formidable = require("formidable");
const path = require("path");
const { log, error } = require("console");
const uploadFolder = path.join(__dirname, "uploads");

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

app.post("/files", function (req, res) {
	const form = formidable();
	form.maxFileSize = 10 * 1024 * 1024;
	form.uploadDir = uploadFolder;
	form.parse(req, (err, fields, { file }) => {
		if (err) {
			error(err);
		}
		pool.query(
			"INSERT INTO files (file_name, file_size) VALUES (?,?)",
			[file.originalFilename, file.size],
			function (err, rows, fields) {
				if (err) console.error(err);
				// res.json(rows);
			}
		);
		res.json({ files: file, fields });
	});
});

app.listen(PORT, function () {
	console.log("server listening on port ", PORT);
});
