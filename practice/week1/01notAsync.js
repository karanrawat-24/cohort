const fs = require('fs');

function f(cb) {
  console.log('in f');
  fs.readFile('a.txt', 'utf-8', function (err, data) {
    cb(data);
  });

  console.log('f ends');
}

function ondone(data) {
  console.log(data);
}

//f is not an async funtion just fs.readfile is async
f(ondone);
console.log('done');
