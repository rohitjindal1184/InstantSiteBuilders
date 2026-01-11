
const pdfLib = require("pdf-parse");
const PDFParse = pdfLib.PDFParse;

async function test() {
    const dummyBuffer = Buffer.from("Not a real PDF"); // This might fail parsing actual PDF logic
    // I should probably use a minimal valid PDF if possible, but "Not a real PDF" usually throws specific error.
    // If I see "InvalidPDFException" or similar, I know it TRIED to parse.

    console.log("Instantiating...");
    const parser = new PDFParse(dummyBuffer);

    try {
        console.log("Calling getText()...");
        const text = await parser.getText();
        console.log("Result type:", typeof text);
        console.log("Result:", text);
    } catch (e) {
        console.log("getText failed:", e.message || e);
        if (e.name) console.log("Error name:", e.name);
    }
}
test();
