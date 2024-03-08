let promise1 = new Promise(function (resolve, reject) {
  // the function is executed automatically when the promise is constructed

  //after 1 second signal that the job is done with the result "done"
  console.log('karan');
  resolve('immediate resolve');
  setTimeout(() => resolve('done'), 1000);
});

let promise2 = new Promise(function (resolve, reject) {
  //after 1 second signal that the job is finished with an error
  console.log('rawat');

  setTimeout(() => reject(new Error('Whoops!')), 1000);
});

console.log(promise1);
// sytax to consume the function
// promise1.then(funtion(result),function(error));
promise2.then(
  (result) => console.log(result),
  (error) => console.log(error.message)
);
console.log('in between');
promise1.then(
  (result) => console.log(result),
  (error) => console.log(error)
);

console.log('in between 2');

//if intreseted in only parameter
//success
promise1.then((result) => console.log(result));

//failure
promise2.then(null, (error) => console.log(error.message));
console.log('in between 3');

// or
promise2.catch((error) => console.log(error.message));
