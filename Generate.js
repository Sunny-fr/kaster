const fs = require('fs')
const _ = require('lodash')
const path = require('path')

class Generate {
  constructor (options) {
    this.file = 'demo.txt'
    this.target = options.target
    this.name = options.name
  }
  data () {
    return {
      uppercaseName: this.name.toUpperCase(),
      lowercaseName: this.name
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
    const root = 'template'
    this.getStructure(root).then(structure => {
      _.each(structure, item => {
        if (item.type == 'directory') {
          fs.mkdirSync(item.path.substr(root.length + 1))
        } else if (item.type == 'file') {
          let fullPath = item.path.substr(root.length + 1)
          const contents = this.getFileContents(item.path)
          const path = fullPath.split('/')
          let fileName = path.pop()
          const ext = fileName.split('.').pop()
          if (fileName.substr(0,1)==='_') fullPath = (path ? path + '/' : '') + this.name + '.' + ext
          fs.writeFileSync(fullPath, _.template(contents)(this.data()))
        }
      })
    }).catch(err=>{
      console.log(err)
    })
  }
}

module.exports = Generate
