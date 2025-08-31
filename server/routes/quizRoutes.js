import express from 'express';
import PDFDocument from 'pdfkit';

const router = express.Router();

// Mock question storage (replace with DB later)
let studentQuizzes: any[] = [];

// --- POST: generate PDF for MCQ ---
router.post('/mcq/pdf', (req, res) => {
  const { title, subject, topic, difficulty, questions } = req.body;

  const doc = new PDFDocument();
  let buffers: Buffer[] = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    const pdfData = Buffer.concat(buffers);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${title.replace(/\s+/g,'_')}.pdf"`
    });
    res.send(pdfData);
  });

  doc.fontSize(20).text(title, { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Subject: ${subject}`);
  doc.text(`Topic: ${topic}`);
  doc.text(`Difficulty: ${difficulty}`);
  doc.moveDown();

  questions.forEach((q: any, index: number) => {
    doc.fontSize(14).text(`${index + 1}. ${q.q}`);
    q.options.forEach((opt: string, i: number) => {
      doc.fontSize(12).text(`   ${String.fromCharCode(65 + i)}. ${opt}`);
    });
    doc.moveDown();
  });

  doc.end();
});

// --- POST: generate PDF for Subjective ---
router.post('/subjective/pdf', (req, res) => {
  const { title, subject, topic, difficulty, questions } = req.body;

  const doc = new PDFDocument();
  let buffers: Buffer[] = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    const pdfData = Buffer.concat(buffers);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${title.replace(/\s+/g,'_')}.pdf"`
    });
    res.send(pdfData);
  });

  doc.fontSize(20).text(title, { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Subject: ${subject}`);
  doc.text(`Topic: ${topic}`);
  doc.text(`Difficulty: ${difficulty}`);
  doc.moveDown();

  questions.forEach((q: any, index: number) => {
    doc.fontSize(14).text(`${index + 1}. ${q.question} (${q.marks || 1} marks)`);
    if (q.keywords) doc.fontSize(12).text(`   Keywords: ${q.keywords.join(', ')}`);
    if (q.sampleAnswer) doc.fontSize(12).text(`   Sample Answer: ${q.sampleAnswer}`);
    doc.moveDown();
  });

  doc.end();
});

export default router;
