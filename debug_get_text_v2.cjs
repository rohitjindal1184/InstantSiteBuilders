
const pdfLib = require("pdf-parse");
const PDFParse = pdfLib.PDFParse;

async function test() {
    // Valid minimal PDF header
    // %PDF-1.0
    const dummyBuffer = Buffer.from("%PDF-1.0\n%EOF");
    const uint8 = new Uint8Array(dummyBuffer);

    console.log("Instantiating with Uint8Array...");
    const parser = new PDFParse(uint8);

    try {
        console.log("Calling getText()...");
        const text = await parser.getText(); // Should return promise
        console.log("Result type:", typeof text);
        console.log("Result:", text);
    } catch (e) {
        console.log("getText failed:", e.message || e);
        if (e.name) console.log("Error name:", e.name);
    }
}
test();
