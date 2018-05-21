module.exports = {
	construct(options) {
		let base = options.cache
		let system = path.join(options.cache, 'system')
		let lib = path.join(options.cache, 'lib')

		mkdirp.sync(base)
		mkdirp.sync(system)
		mkdirp.sync(lib)
		fs.writeFileSync('manifest.json', JSON.stringify({
			version: '1.0.0'
		}));

		let config = JSON.parse(fs.readFileSync(options.config))

		// normalize source keys
		for(let key in config.sources) {
			let configDirectory = path.parse(options.config).dir;
			let sourceDirectory = path.resolve(configDirectory, config.sources[key])
			config.sources[key] = sourceDirectory;
		}

		let symbols = {};

		log.v(config)
		for(let key in config.instances) {
			config.instances[key].pid = pid()
			symbols[key] = config.instances[key].pid
			compileInstance(config.instances[key])
		}

		// log.d(symbols);

		// HACK use a csprng ffs
		function pid() {
			let str = "";
			for(let i = 0; i < 32; i ++) str += "0123456789ABCDEF"[Math.floor(Math.random() * 16)]
			return str;
		}

		function compileInstance(obj) {
			let moduleType = obj.module;
			let moduleTypePath = path.join(system, moduleType);
			let entityFilepath = path.join(moduleTypePath, `${obj.pid}.json`);
			// if we havent created the moduleType folder, do that
			if(!fs.existsSync(moduleTypePath)) {
				mkdirp.sync(moduleTypePath)
				let marString = getModule(obj.source, obj.module)
				let moduleMarPath = path.join(moduleTypePath, 'module.mar')
				fs.writeFileSync(moduleMarPath, marString)
			}

			let fileObject = {};
			fileObject.moduleType = moduleType
			fileObject.pid = obj.pid
			fileObject.par = obj.par || {}

			fs.writeFileSync(entityFilepath, JSON.stringify(fileObject))

			//TODO install dependencies
			//process.env.YARN_PATH and NPM_PATH exist here
		}

		function getModule(src, type) {
			if(true /* TODO src is not a URL */) {
				let modulePath = path.join(config.sources[src], type)
				let marObj = mar.fromDirectory(modulePath)
				return marObj.toString()
			}
		}
	}
}

const mkdirp = require('mkdirp')
const fs = require('fs')
const path = require('path')
const log = require('./log.js')
const mar = require('./mar.js')