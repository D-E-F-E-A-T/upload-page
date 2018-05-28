const colors = require('colors');
const fs = require("fs");
const formidable = require('formidable');

function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if(err) {
                return reject(err);
            }
            resolve(data)
        });
    });
}

exports.upload = (req, res) => {
  fs.readFile('templates/upload.html', (err, html) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (error, fields, files) => {
      let oldpath = files.upload.path;
      let newpath = 'C:/Users/Public/' + "test.jpg";
      fs.rename(oldpath, newpath, (err) => {
        if (err) throw err;
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.write("<h1>Received image</h1> <br/>");
        res.write("<img src='/show'/>")
        res.end();
      });
    });
  });
}

exports.welcome = (req, res) => {
    console.log('Start request welcome'.green);
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    readFile('templates/start.html')
      .then(result => res.write(result))
      .then(result => res.end())
      .catch(err => console.log(err))
}

exports.show = (req, res) => {
    res.writeHead(200, {"Content-Type" :  "image/jpeg"});
    readFile('C:/Users/Public/test.jpg')
      .then(result => res.write(result))
      .then(result => res.end())
      .catch(err => console.log(err))

}

exports.error = (req, res) => {
    console.log('I have no idea what i should to do'.red);
    res.write('404 :(');
    res.end();
}


/*readFile('./test')
.then(result => console.log(result))
.catch(err => console.log(err))
*/
