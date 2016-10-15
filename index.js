

const args = process.argv.slice(2)
const name = args[0] || 'not-named'
const target = args[1] || '.'
const Generate = require('./Generate')

console.log('generating', name, 'in', target)
const cast = new Generate({name, target}).build()
