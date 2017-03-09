const args = process.argv.slice(2)
const component = args[0]
const name = args[1] || 'not-named'
const target = args[2] || '.'

const chalk = require('chalk')
const Generate = require('./src/Generate')
const moduleAvailable = require('./src/moduleAvailable')

const prefix = 'kaster-'

console.log('')
console.log('')
console.log(chalk.blue('  -={    K a s t e r    }=-'))
console.log('')
console.log(chalk.blue('           hello ! '))
console.log('')
console.log('')

if (!component) {
    console.log(chalk.red('please provide a generator'))
    console.log('')
    console.log('')
    return;
}

const modulePath = moduleAvailable(prefix + component, process.cwd())
if (modulePath) {
    console.log('')
    console.log('')
    console.log(chalk.yellow('    casting generator:', component))
    console.log(chalk.yellow('    generating ', "'" + name + "'", 'in', target))
    console.log('')
    console.log('')
    console.log('')
    const cast = new Generate({component: prefix + component, name, target, modulePath}).build()
}
