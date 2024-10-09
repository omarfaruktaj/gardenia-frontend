'use client';

import React from 'react';

import { FaFilePdf } from 'react-icons/fa';
import generatePDF, { Margin, Options, Resolution } from 'react-to-pdf';

import { Button } from '../ui/button';

interface GeneratePDFButtonProps {
  postId: string;
}
const options: Options = {
  filename: 'post.pdf',
  resolution: Resolution.HIGH,
  page: {
    margin: Margin.SMALL,
    format: 'letter',
  },
  canvas: {
    mimeType: 'image/png',
    qualityRatio: 1,
  },
  overrides: {
    pdf: {
      compress: true,
    },
    canvas: {
      useCORS: true,
    },
  },
};

const GeneratePDFButton: React.FC<GeneratePDFButtonProps> = ({ postId }) => {
  const getTargetElement = () => document.getElementById(postId);

  const handleGeneratePDF = async () => {
    if (getTargetElement) {
      await generatePDF(getTargetElement, options);
    } else {
      // console.error('Target element not found');
    }
  };

  return (
    <Button
      variant={'ghost'}
      size={'icon'}
      className="rounded-full hover:text-primary"
      onClick={handleGeneratePDF}
    >
      <FaFilePdf className="h-5 w-5" />
    </Button>
  );
};

export default GeneratePDFButton;
