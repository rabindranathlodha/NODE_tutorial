const fs = require('fs');

// //Sync way to write to a file
// fs.writeFileSync('./test.txt', "Hey there!");

// //Async way to write to a file
// fs.writeFile('./test.txt', "Hello World", (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('File written successfully!');
//     }
// });

// //Sync way to read from a file
// const data = fs.readFileSync('./contacts.txt', "utf-8");
// console.log(data);

// // Async way to read from a file
// fs.readFile('./contacts.txt', "utf-8", (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// });

// // Sync way to append to a file
// fs.appendFileSync('./test.txt', "\nHello World Appended!");

// // Async way to append to a file
fs.appendFile('./test.txt', "\nHello World Appended! Synchronously", (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('File appended successfully!');
    }
});