
const pdfLib = require("pdf-parse");
console.log("pdfLib keys:", Object.keys(pdfLib));

if (pdfLib.PDFParse) {
    console.log("pdfLib.PDFParse type:", typeof pdfLib.PDFParse);
    console.log("pdfLib.PDFParse string:", pdfLib.PDFParse.toString().substring(0, 100));
}

// Try finding ANY function in the export
for (const key of Object.keys(pdfLib)) {
    if (typeof pdfLib[key] === 'function') {
        console.log(`Found function export: ${key}`);
    }
}
