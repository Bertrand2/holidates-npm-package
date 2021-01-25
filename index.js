#!/usr/bin/env node
"use strict";

/* REQUIREMENTS */
const axios = require('axios');
const chalk = require('chalk');
const Countries = require('./countries.js').Countries;
const countryList = new Countries();
const Commands = require('./commands.js').Commands;
const commands = new Commands(countryList);
const apiUrl = "https://date.nager.at/api/v2/publicholidays";

/* FUNCTIONS DECLARATION */
const checkForCommand = (argument) => {
	if( argument.startsWith("-") ) {
		commands.getCallback( argument.slice(1) )();
		return true;
	}
	return false;
}
const formattedPrint = (dates) => {
	dates.forEach(element => {
		const date = element.date.split("-");
		console.log(chalk.green.bold(`${date[2]}/${date[1]}/${date[0]}:`), `${element.localName} ( ${element.name} )`);
	});
}
const printDates = async (url) => {
	try {
		const datesRequest = await axios.get(url);
		// console.log(datesRequest);
		formattedPrint(datesRequest.data);
	} catch (err) {
		console.log( `${chalk.red.bold("ERROR !")} There was an error with the request` );
	}
}

/* GET ARGUMENTS */
const args = process.argv.slice(2);
if( checkForCommand(args[0]) ) {
	return;
}
const year = args.pop();
const countryCode = countryList.getCode(args.join(" "));

/* ERROR HANDLING */
if( !countryCode ) {
	console.log( `${chalk.red.bold("ERROR !")} The country submitted is not correct.\nCommand syntax : ${chalk.yellow("holidays [Country] [Year]")}\nGet the full country list by typing ${chalk.yellow("holidays -list")}` );
	return;
} else if( !year ) {
	console.log( `${chalk.red.bold("ERROR !")} The year submitted is not correct.\nCommand syntax : ${chalk.yellow("holidays [Country] [Year]")}` );
	return;
}

/* AXIOS REQUEST */
const requestUrl = `${apiUrl}/${year}/${countryCode}`;
printDates(requestUrl);