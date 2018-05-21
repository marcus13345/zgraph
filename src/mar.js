module.exports = class Mar {
	constructor(json) {
		this._files = json
	}

	fromFile(path) {

	}

	fromDirectory(base) {
		let name = path.parse(base).base
		for(let file in fs.lstatSync(base)) {
			log.d(file)
		}
	}
}

const path = require('path')
const fs = require('fs')