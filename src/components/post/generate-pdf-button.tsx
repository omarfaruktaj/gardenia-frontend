'use client';

import React from 'react';

import { PDFDocument, PDFFont, StandardFonts, rgb } from 'pdf-lib';
import { FaFilePdf } from 'react-icons/fa';
import { toast } from 'sonner';

import { ISinglePost } from '@/types';

import { Button } from '../ui/button';

interface GeneratePDFButtonProps {
  post: ISinglePost;
}

const sanitizeText = (text: string): string => {
  return text.replace(/[^\x00-\x7F]/g, '');
};

const download = (bytes: Uint8Array, filename: string, mimeType: string) => {
  const blob = new Blob([bytes as BlobPart], { type: mimeType });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const wrapText = (
  text: string,
  font: PDFFont,
  size: number,
  maxWidth: number
): string[] => {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const textWidth = font.widthOfTextAtSize(testLine, size);

    if (textWidth <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines;
};

const GeneratePDFButton: React.FC<GeneratePDFButtonProps> = ({ post }) => {
  const handleGeneratePDF = async () => {
    toast.info('Generating PDF document...');

    try {
      const pdfDoc = await PDFDocument.create();
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const helveticaBoldFont = await pdfDoc.embedFont(
        StandardFonts.HelveticaBold
      );

      let page = pdfDoc.addPage();
      const { width, height } = page.getSize();

      const margin = 50;
      const contentWidth = width - 2 * margin;
      let y = height - margin;

      const title = sanitizeText(post.title || 'Untitled Post');
      const author = sanitizeText(post.author.name);
      const category = sanitizeText(post.category.name);
      const createdDate = new Date(post.createdAt).toLocaleDateString();
      const rawContent = sanitizeText(post.content.replace(/<[^>]+>/g, ' '));

      const titleSize = 24;
      const titleLines = wrapText(
        title,
        helveticaBoldFont,
        titleSize,
        contentWidth
      );

      for (const line of titleLines) {
        page.drawText(line, {
          x: margin,
          y,
          size: titleSize,
          font: helveticaBoldFont,
          color: rgb(0, 0.53, 0.71),
        });
        y -= titleSize + 5;
      }
      y -= 5;

      const metadataSize = 12;
      const meta = `By ${author} | ${createdDate} | Category: ${category}`;
      page.drawText(meta, {
        x: margin,
        y,
        size: metadataSize,
        font: helveticaFont,
        color: rgb(0.5, 0.5, 0.5),
      });
      y -= metadataSize + 30;

      const contentSize = 12;
      const lines = wrapText(
        rawContent,
        helveticaFont,
        contentSize,
        contentWidth
      );

      for (const line of lines) {
        if (y < margin + contentSize) {
          page = pdfDoc.addPage();
          y = page.getSize().height - margin;
        }

        page.drawText(line, {
          x: margin,
          y,
          size: contentSize,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        y -= contentSize + 5;
      }

      const pdfBytes = await pdfDoc.save();

      const filename = `${
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '') || 'post'
      }.pdf`;

      download(pdfBytes, filename, 'application/pdf');
      toast.success('PDF successfully created!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF. See console for details.');
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full hover:text-primary"
      onClick={handleGeneratePDF}
      aria-label="Generate PDF"
    >
      <FaFilePdf className="h-5 w-5" />
    </Button>
  );
};

export default GeneratePDFButton;
