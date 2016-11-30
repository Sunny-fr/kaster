const fs = require('fs')
const _ = require('lodash')
const path = require('path')
const chalk = require('chalk')

function t(s,d){
 for(let p in d)
   s=s.replace(new RegExp('---'+p+'---','g'), d[p]);
 return s;
}


function log(str) {
  console.log( chalk.green(str))
}


class Generate {
  constructor (options) {
    this.component = options.component
    this.target = options.target
    this.name = options.name
  }
  data () {
    return {
      uppercaseName: this.name.toUpperCase(),
      lowercaseName: this.name,
      capitalizeName: this.name.substr(0,1).toUpperCase() + this.name.substr(1)
    }
  }
  getFileContents (file) {
    return fs.readFileSync(file, {encoding:'utf8'})
  }
  getStructure (root) {
    return new Promise(function(resolve, reject){
      const structure = {}
      function walkSync(currentDirPath) {
          fs.readdirSync(currentDirPath).forEach(function (name) {
              var filePath = path.join(currentDirPath, name);
              var stat = fs.statSync(filePath);
              if (stat.isFile()) {
                  structure[filePath] = {type:'file', path:filePath}
              } else if (stat.isDirectory()) {
                  structure[filePath] = {type:'directory', path:filePath}
                  walkSync(filePath);
              }
          });
      }
      walkSync(root)
      resolve(structure)
    })
  }
  build () {
    const root = 'node_modules/' + this.component + '/template'
    const base = this.target + '/'
    this.getStructure(root).then(structure => {
      _.each(structure, item => {
        if (item.type == 'directory') {
          fs.mkdirSync(base + item.path.substr(root.length + 1))
          log('| ' + item.path.substr(root.length + 1))
        } else if (item.type == 'file') {
          const fullPath = base + t(item.path.substr(root.length + 1), this.data())
          const contents = this.getFileContents(item.path)
          //console.log(contents)
          fs.writeFileSync(fullPath, _.template(contents)(this.data()))

          log('  -- ' + t(item.path.substr(root.length + 1), this.data()))
        }
      })
    }).catch(err=>{
      console.log(err)
    })
  }
}

module.exports = Generate
