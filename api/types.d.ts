declare module "pdf-parse/lib/pdf-parse.js" {
  interface PdfData {
    text: string;
    numpages: number;
    info: Record<string, unknown>;
  }
  function pdfParse(buffer: Buffer): Promise<PdfData>;
  export default pdfParse;
}

declare module "@iarna/rtf-to-html" {
  export function fromString(
    rtf: string,
    callback: (err: Error | null, html: string) => void,
  ): void;
  const converter: { fromString: typeof fromString };
  export default converter;
}
