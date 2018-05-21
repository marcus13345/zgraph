#!/usr/bin/env node

module.exports = {
	commands: {
		compile,
		deploy
	}
};

const path = require('path')
const fs = require('fs')
const which = require('which')
const log = require('./log.js')

log.v('checking for globally installed tools...');

let yarn, npm, bower

try {
	yarn = which.sync('yarn');
	log.v('yarn check passed', yarn)
}catch(e) {
	log.w('yarn is not installed, for faster compile times, run npm i -g yarn')
	yarn = null
}

try {
	npm = which.sync('npm');
	log.v('npm check passed', npm)
}catch(e) {
	log.w('how do you not have npm installed? reinstall node')
	npm = null
}

try {
	bower = which.sync('bower');
	log.v('bower check passed', bower)
}catch(e) {
	log.w('bower is not installed, to use it in modules, run npm i -g bower')
	bower = null
}

function compile() {

}

function deploy() {

}

function parseArgs() {
	let shortcuts = {
		d: 'dir'
	}
	let flags = {}, flag = 'cmd'
	let args = process.argv.slice(2);
	for(let arg of args) {
		if(arg.startsWith('--')) {
			let val = arg.substr(2)
			flag = val
			flags[flag] = true
		} else if (arg.startsWith('-')) {
			let val = arg.substr(1)
			if(val in shortcuts) flag = shortcuts[val]
			else flag = val
			flags[flag] = true
		} else {
			let val = arg
			flags[flag] = val
		}
	}
	if(flags.cmd === 'c') flags.cmd = 'compile'
	if(flags.cmd === 'd') flags.cmd = 'deploy'
	return flags
}

function cli() {
	let options = parseArgs()
	console.dir(options)
}

if (require.main === module) cli()