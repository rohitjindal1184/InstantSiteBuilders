
const pdfLib = require("pdf-parse");
const PDFParse = pdfLib.PDFParse;

async function test() {
    const dummyBuffer = Buffer.from("Not a real PDF");
    console.log("Instantiating PDFParse...");
    try {
        const parser = new PDFParse(dummyBuffer);
        console.log("Instance created.");
        console.log("Instance keys:", Object.keys(parser));
        console.log("Prototype keys:", Object.getOwnPropertyNames(Object.getPrototypeOf(parser)));

        // Try to access doc if public
        // @ts-ignore
        if (parser.doc) console.log("parser.doc:", parser.doc);

        // Try standard methods if guessed
        if (parser.text) console.log("Has .text property");
        if (typeof parser.subType === 'function') console.log("Has subType()");
    } catch (e) {
        console.log("Error:", e.message);
    }
}
test();
