const chalk = require('chalk')

function findGlobal(name) {
    try {
        return require.resolve(name);
    } catch(e){
        console.log(chalk.red('Module ' + name + ' not found global modules'))
    }
    return false;
}


function findLocal(name, path) {
    try {
        const local_path = path + '/node_modules/' + name + '/index.js'
        require(local_path)
        return local_path
    } catch (e) {
        console.log(chalk.red('Module ' + name + ' not found in local modules'))
    }
    return false;
}

function cleanStr(str) {
    return str.replace(/(\/index\.js)$/,'')
}

module.exports = function (name, path) {
    const localDep = findLocal(name, path)
    if (localDep) return cleanStr(localDep)

    console.log(chalk.red('Trying to get from global modules...'))
    const globalDep = findGlobal(name)
    if (globalDep) return cleanStr(globalDep)

    return false;
}
