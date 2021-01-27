#!/usr/bin/env node
"use strict";

/* REQUIREMENTS */
const axios = require('axios');
const cheerio = require('cheerio');
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
		console.log( `${chalk.red.bold("ERROR !")} There was an error with the request. Either the nager website is down or the data on the given request doesn't exist.` );
	}
}

/* GET ARGUMENTS */
const args = process.argv.slice(2);
if( checkForCommand(args[0]) ) {
	return;
}
let year, countryCode;
if( /\d+/.test(args[args.length-1]) ) {
	year = args.pop();
} else {
	year = (new Date()).getUTCFullYear();
}
if( args.length == 1 &&  args[0].length == 2 && countryList.getName(args[0]) ) {
	countryCode = args[0];
} else {
	countryCode = countryList.getCode(args.join(" "));
}

/* ERROR HANDLING */
if( !countryCode ) {
	console.log( `${chalk.red.bold("ERROR !")} The country submitted is not correct.\nCommand syntax : ${chalk.yellow("holidates [Country/Country code] [Year (optionnal)]")}\nGet the full country list by typing ${chalk.yellow("holidates -list")}` );
	return;
} else if( !year ) {
	console.log( `${chalk.red.bold("ERROR !")} The year submitted is not correct.\nCommand syntax : ${chalk.yellow("holidates [Country/Country code] [Year (optionnal)]")}` );
	return;
}

/* CODE EXECUTION */
const requestUrl = `${apiUrl}/${year}/${countryCode}`;
printDates(requestUrl);