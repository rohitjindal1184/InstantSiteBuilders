
const pdfLib = require("pdf-parse");
const PDFParse = pdfLib.PDFParse;

async function test() {
    const dummyBuffer = Buffer.from("Not a real PDF");
    console.log("Testing PDFParse...");

    try {
        console.log("Attempting call as function...");
        const result = await PDFParse(dummyBuffer);
        console.log("Success (function)!", result);
    } catch (e) {
        console.log("Function call failed:", e.message);
        try {
            console.log("Attempting new PDFParse()...");
            const parser = new PDFParse(dummyBuffer);
            console.log("Instantiated. Now what?");
        } catch (e2) {
            console.log("Constructor call failed:", e2.message);
        }
    }
}
test();
