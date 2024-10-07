const fs = require("fs");

// Synchronous

fs.writeFileSync('./test1.txt', "Namaste Bharat Sync")

// const res = fs.readFileSync("./about.txt", "utf-8", (err)=>{})
// console.log(res);
// console.log(res.toString());


// fs.unlinkSync("./about.txt")



// Asynchronous

// fs.writeFile("./test.txt", "Namaste Bharat Async");  // err
fs.writeFile("./test.txt", "Namaste Bharat Async", (err) => {});

// fs.readFile("./about.txt", "utf-8" , (err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(res);
//     // console.log(res.toString());
//   }
// });

// fs.unlink("./test.txt", (err)=>{})