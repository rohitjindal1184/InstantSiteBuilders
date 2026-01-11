
import { createRequire } from "module";
const require = createRequire(import.meta.url);

async function test() {
    try {
        console.log("Attempting to require pdf-parse...");
        const pdf = require("pdf-parse");
        console.log("pdf-parse required:", pdf);
        console.log("Is pdf a function?", typeof pdf === 'function');
        console.log("pdf properties:", Object.keys(pdf));

        // Check if default export exists
        // @ts-ignore
        if (pdf.default) {
            console.log("pdf.default is:", typeof pdf.default);
        }


        const dummyBuffer = Buffer.from("Not a real PDF");
        console.log("Attempting to parse dummy buffer...");
        try {
            await pdf(dummyBuffer);
        } catch (e: any) {
            console.log("Caught expected error (invalid pdf):", e.message || e);
        }
        console.log("Test finished.");
    } catch (err) {
        console.error("CRITICAL IMPORT ERROR:", err);
    }
}

test();
