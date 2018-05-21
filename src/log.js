module.exports = {
	i, v, w, e, d
}

function i(...args) {
	console.log('\u001b[36m[INFO]', ...args, '\u001b[37m')
}
function v(...args) {
	console.log('\u001b[90m[VRBS]', ...args, '\u001b[37m')
}
function w(...args) {
	console.log('\u001b[33m[WARN]', ...args, '\u001b[37m')
}
function e(...args) {
	console.log('\u001b[31m[ERRR]', ...args, '\u001b[37m')
}
function d(...args) {
	console.log('\u001b[35m[DBUG]', ...args, '\u001b[37m')
}