/*  This script generates mock data for local development.
	This way you don't have to point to an actual API,
	but you can enjoy realistic, but randomized data,
	and rapid page loads due to local, static data.
	https://github.com/json-schema-faker/json-schema-faker
 */

/* eslint-disable no-console */

import chalk from "chalk";
import faker from "faker";
import fs from "fs";
import jsf from "json-schema-faker";
import {schema} from "./mockDataSchema";

const outputFile = "./src/api/db.json";

jsf.extend("faker", () => faker);

jsf.resolve(schema).then(result => {
	fs.writeFile(outputFile, JSON.stringify(result, null, 2), err => {
		if (err) {
			return (console.log(chalk.red(err)));
		} else {
			console.log(chalk.green(`Mock Data Generated Here: ${outputFile}`));
		}
	});
});
