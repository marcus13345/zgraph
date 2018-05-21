module.exports = class Mar {
	constructor(json) {
		this._files = json
	}

	static fromFile(path) {

	}

	toString() {
		return JSON.stringify(this._files)
	}

	static fromDirectory(base) {
		let obj = {};
		let name = path.parse(base).base
		for(let file of fs.readdirSync(base)) {
			let filepath = path.resolve(base, file)
			let content = fs.readFileSync(filepath).toString()
			content = content.replace(/[\r\t]/g, '')
			obj[file] = content
		}
		return new Mar(obj).toString()
	}
}

const path = require('path')
const fs = require('fs')
const log = require('./log.js')