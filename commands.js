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
						`The main feature is made by running the command :\n${chalk.yellow("holidates [Country] [Year]")}\n\nYou can also run ${chalk.italic("holidates")} followed by :\n`
					);
					this.printDescriptions()
				}
			},
			{
				"names" : ["list", "countrylist", "countries", "clist","l"],
				"description" : "displays all countries available to make the request. It is possible that the API doesn't have country holidays informations.",
				"callback" : () => {
					console.log( JSON.stringify(this.countryList.getNames(), null, 1) );
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