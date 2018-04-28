/*
	This spins up a local production server.
	This is NOT for actual production use,
	but rather it is useful for hosting a minified
	production build for local debugging purposes.
 */

import compression from "compression";
import express from "express";
import open from "open";
import path from "path";
import cors from "cors";

/* eslint-disable no-console */

let port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(compression());
app.use(express.static("dist"));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Endpoint for http API - pretend Production API
app.get("/users", (req, res) => {
	// Hard coding for simplicity, pretend this hits a real database
	res.json([
		{"id": 1, "firstName": "Bob", "lastName": "Smith", "email": "bob@gmail.com"},
		{"id": 2, "firstName": "Tammy", "lastName": "Norton", "email": "tnorton@yahoo.com"},
		{"id": 3, "firstName": "Tina", "lastName": "Lee", "email": "lee.tina@hotmail.com"},
	]);
});

app.listen(port, (err) => {
	if (err) {
		console.log(err);
	} else {
		open("http://localhost:" + port);
	}
});
