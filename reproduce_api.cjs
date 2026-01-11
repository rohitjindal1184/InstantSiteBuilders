
const fs = require('fs');
const http = require('http');

// Minimal valid PDF
const pdfContent = `%PDF-1.0
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj 3 0 obj<</Type/Page/MediaBox[0 0 3 3]>>endobj
xref
0 4
0000000000 65535 f
0000000010 00000 n
0000000060 00000 n
0000000111 00000 n
trailer<</Size 4/Root 1 0 R>>
startxref
160
%%EOF`;

const boundary = '--------------------------boundary';

const postDataStart = `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="test.pdf"\r\nContent-Type: application/pdf\r\n\r\n`;
const postDataEnd = `\r\n--${boundary}--\r\n`;

const pdfBuffer = Buffer.from(pdfContent);
const contentLength = Buffer.byteLength(postDataStart) + pdfBuffer.length + Buffer.byteLength(postDataEnd);

const req = http.request({
    hostname: 'localhost',
    port: 5001,
    path: '/api/convert-pdf',
    method: 'POST',
    headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': contentLength
    }
}, (res) => {
    let data = '';
    res.on('data', chuck => data += chuck);
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log('Body:', data);
    });
});

req.on('error', (e) => {
    console.error('Request error:', e);
});

req.write(postDataStart);
req.write(pdfBuffer);
req.write(postDataEnd);
req.end();
