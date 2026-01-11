
const pdf = require("pdf-parse");
console.log("Type of pdf:", typeof pdf);
console.log("Is function?", typeof pdf === 'function');
console.log("Keys:", Object.keys(pdf));

if (typeof pdf !== 'function') {
    console.log("Not a function. Trying default...");
    if (pdf.default) console.log("pdf.default type:", typeof pdf.default);
}
