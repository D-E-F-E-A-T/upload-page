const colors = require('colors');
const fs = require("fs");
const formidable = require('formidable');

exports.upload = (req, res) => {
  fs.readFile('templates/upload.html', (err, html) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (error, fields, files) => {
      let oldpath = files.upload.path;
      let newpath = 'C:/Users/Public/' + "test.jpg";
      fs.rename(oldpath, newpath, (err) => {
        if (err) throw err;
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.write("received image: <br/>");
        res.write("<img src='/show'/>")
        res.end();
      });
    });
  });
}

exports.welcome = (req, res) => {
    console.log('Start request welcome'.green);
    fs.readFile('templates/start.html', (err, html) => {
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.write(html);
        res.end();
    });
}

exports.show = (req, res) => {
    fs.readFile("C:/Users/Public/test.jpg", "binary", (error, file) => {
        res.writeHead(200, {"Content-Type" :  "image/jpeg"});
        res.write(file, "binary");
        res.end();
    });
}

exports.error = (req, res) => {
    console.log('I have no idea what i should to do'.red);
    res.write('404 :(');
    res.end();
}
