import PDFDocument from "pdfkit";
import { Response } from "express";

export function pipePdf(res: Response, filename: string): PDFKit.PDFDocument {
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  const doc = new PDFDocument({ margin: 50 });
  doc.pipe(res);
  return doc;
}

export function header(doc: PDFKit.PDFDocument, title: string, meta?: Record<string, string>) {
  doc.fontSize(20).text(title, { align: "center" }).moveDown(0.5);
  if (meta) {
    doc.fontSize(10);
    Object.entries(meta).forEach(([k, v]) => doc.text(`${k}: ${v}`));
    doc.moveDown();
  }
  doc.moveDown(0.5);
  doc.moveTo(50, doc.y).lineTo(doc.page.width - 50, doc.y).stroke();
  doc.moveDown();
}
