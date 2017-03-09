const chalk = require('chalk')

function findGlobal(name) {
    try {
        require.resolve(name);
        return true;
    } catch(e){
        console.log(chalk.red('Module ' + name + ' not found global modules'))
    }
    return false;
}


function findLocal(name, path) {
    try {
        const local_path = path + '/node_modules/' + name + '/package.json'
        require(local_path)
        return true
    } catch (e) {
        console.log(chalk.red('Module ' + name + ' not found in local modules'))
    }
    return false;
}

module.exports = function (name, path) {
    if (findLocal(name, path)) return true
    console.log(chalk.red('Trying to get from global modules...'))
    if (findGlobal(name)) return true
    return false;
}
