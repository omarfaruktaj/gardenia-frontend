'use client';

import React, { useEffect, useState } from 'react';

import { FaFilePdf } from 'react-icons/fa';
import generatePDF, { Margin, Options, Resolution } from 'react-to-pdf';
import { toast } from 'sonner';

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
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(typeof window !== 'undefined');
  }, []);
  if (!isBrowser) return;

  const getTargetElement = () => document?.getElementById(postId);

  const handleGeneratePDF = async () => {
    if (!isBrowser) return;
    toast.info('We are working on it. Please wait few second');
    if (getTargetElement) {
      await generatePDF(getTargetElement, options);
    } else {
      toast.error('Something went very wrong! Please try again');
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
