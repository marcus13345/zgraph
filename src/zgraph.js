module.exports = {
	commands: {
		compile,
		deploy
	}
};

const path = require('path')
const fs = require('fs')
const which = require('which')

let yarn, npm, bower

try {
	yarn = which.sync('yarn');
}catch(e) {
	log.w('yarn is not installed, for faster compile times, run npm i -g yarn')
	yarn = null
}

try {
	npm = which.sync('npm');
}catch(e) {
	log.w('how do you not have npm installed? reinstall node')
	npm = null
}

try {
	bower = which.sync('bower');
}catch(e) {
	log.w('bower is not installed, to use it in modules, run npm i -g bower')
	bower = null
}

function compile() {

}

function deploy() {

}


function cli() {

}

if (require.main === module) cli()