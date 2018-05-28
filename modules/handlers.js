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

function asyncForm(form, req, res) {
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if(err) {
                return reject(err);
            }
            const data = {
                oldpath: files.upload.path,
                newpath: 'C:/Users/Public/' + "test.jpg",
                title: fields.title
            }
            resolve(data);
        });
    });
}

function asyncRename(oldpath, newpath, title) {
    return new Promise((resolve, reject) => {
        fs.rename(oldpath, newpath, (err) => {
            if(err) {
                return reject(err)
            } else {
                resolve(title)
            }
        });
    });
}

exports.upload = (req, res) => {
    let form = new formidable.IncomingForm();
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    asyncForm(form, req ,res)
    .then(result => result)
    .then(result => asyncRename(result.oldpath, result.newpath, result.title))
    .then(result => res.write(`
        <figure style="text-align: center">
            <em>Image name:</em> <h2>${result}</h2><br>
            <img src="/show" alt="smile Face :)" width="400" height="400">
            <figcaption><var>file saved in: 'C:/Users/Public/'</var></figcaption>
        </figure>
    `))
    .then(result => res.end())

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
