exports.upload = (req, res) => {
    console.log('Start request upload');
    res.write('start upload');
    res.end();
}

exports.welcome = (eq, res) => {
    console.log('Start request welcome');
    res.write('Welcome on page my friend');
    res.end();
}

exports.error = (eq, res) => {
    console.log('I have no idea what i should to do');
    res.write('404 :(');
    res.end();
}
