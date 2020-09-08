const koa1 = require('koa')
const fs = require('fs')

var app = koa1()

const file1 = '../file/file1.json',
      file2 = '../file/file2.json',
      doReadFile = (filename) => {
            fs.readFile(filename, function(err, data) {
                if(err) {
                    return filename + 'err'
                }
                return data
            })          
      }      
      
app.use('/test', function *(){
    var data = yield doReadFile(file1)
    data += yield doReadFile(file2)
    this.body = data
})

app.listen(3000)