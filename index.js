
const args = process.argv.slice(2)
const component = args[0]
const name = args[1] || 'not-named'
const target = args[2] || '.'

const chalk = require('chalk')
const Generate = require('./src/Generate')
const moduleAvailable = require('./src/moduleAvailable')

const prefix = 'caster-'

if (moduleAvailable(prefix + component)) {
  console.log('')
  console.log( chalk.blue('  -={  Caster  }=-'))
  console.log('')
  console.log( chalk.yellow('casting :', component ))
  console.log( chalk.yellow('generating', name, 'in', target))
  console.log('')

  const cast = new Generate({component: prefix + component, name, target}).build()

}
