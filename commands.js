//Commands instances require chalk to work properly

const chalk = require("chalk");

class Commands {
	constructor(countryList) {
		this.countryList = countryList;
		this.commands = [
			{
				"names" : ["help","h"],
				"description" : "displays all commands available.",
				"callback" : () => {
					console.log(
						`The main feature is made by running the command :\n${chalk.yellow("holidates [Country/Country code] [Year (optionnal)]")}\n\nYou can also run ${chalk.italic("holidates")} followed by :\n`
					);
					this.printDescriptions()
				}
			},
			{
				"names" : ["list", "countrylist", "countries", "l"],
				"description" : "displays all countries available to make the request. It is possible that the API doesn't have country holidays informations.",
				"callback" : () => {
					console.log( JSON.stringify(this.countryList.getNames(), null, 1) );
				}
			},
			{
				"names" : ["olidates", "o"],
				"description" : "Olivier asked, Olivier got it.",
				"callback" : () => {
					const oli = chalk.bold.italic("oli");
					const content = [
						`Here is a ${oli}full ${oli}list of ${oli}dates :`
					];
					const dates = [
						{
							"name": "Birthday of Olivier Minne",
							"date": "18/03"
						},
						{
							"name": "Birthday of Olivier (the one and only)",
							"date": "26/04"
						},
						{
							"name": "Saint Olivier d'Ancône",
							"date": "27/05"
						},
						{
							"name": "Saint Olivier Plunket",
							"date": "01/07"
						},
						{
							"name": "Fête de l'Olive à Pignan (2019)",
							"date": "13/10"
						}
					]
					dates.forEach( element => content.push(`${ chalk.bold.green(element.date + " : ") }${ element.name }`) );
					console.log( content.join("\n") );
				}
			}
		];
		this.defaultCallback = () => {
			console.log( `${chalk.red.bold("ERROR !")} Unknown command. Try ${chalk.italic("holidates -help")} for help.` );
		}
	}
	getCallback(command) {
		const foundCommand = this.commands.find(element => element.names.includes( command.toLowerCase() ) );
		return foundCommand ? foundCommand.callback : this.defaultCallback;
	}
	printDescriptions() {
		return this.commands.forEach( element => console.log(`\t`+chalk.bold(`-${element.names[0]} : `)+`${element.description}\n`) );
	}
}

module.exports.Commands = Commands;