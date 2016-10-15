const chalk = require('chalk')
module.exports = function (name) {
    try {
        require.resolve(name);
        return true;
    } catch(e){
      console.log(chalk.red('Module ' + name + ' not found'))
    }
    return false;
}
