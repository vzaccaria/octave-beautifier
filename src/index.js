var {
  docopt
} = require('docopt')
var fs = require('fs')
var path = require('path')
var beauty = require('./lib/beauty')

var readIn = (cb) => {
  "use strict"
  process.stdin.setEncoding('utf8');

  var data = ""

  process.stdin.on('readable', function () {
    var chunk = process.stdin.read();
    if (chunk !== null) {
      data = data.concat(chunk)
    }
  });

  process.stdin.on('end', function () {
    cb(data)
  });
}


var getOptions = doc => {
  "use strict"
  var o = docopt(doc)
  var help = o['--help'] || false
  return {
    help
  }
}

var doc = fs.readFileSync(path.join(__dirname, "/docs/usage.md"), 'utf8')

var main = () => {
  "use strict"
  var {
    help
  } = (getOptions(doc))
  if (!help) {
    readIn(_ => {
      console.log(beauty(_));
    })
  }
}

main()