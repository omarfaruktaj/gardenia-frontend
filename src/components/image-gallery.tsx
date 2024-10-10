'use client';

import { useState } from 'react';

import Image from 'next/image';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const images = [
  {
    src: '/static/gardening/image1.jpg',
    caption: 'Blooming beauty in the garden.',
  },
  {
    src: '/static/gardening/image2.png',
    caption: 'A splash of color among the greens.',
  },
  {
    src: '/static/gardening/image3.webp',
    caption: 'Sunlight filtering through the leaves.',
  },
  {
    src: '/static/gardening/image9.png',
    caption: 'Nature’s artwork on display.',
  },
  {
    src: '/static/gardening/image5.png',
    caption: 'Gardening brings joy and tranquility.',
  },
  {
    src: '/static/gardening/image6.png',
    caption: 'Every flower is a soul blossoming in nature.',
  },
  {
    src: '/static/gardening/image7.png',
    caption: 'The serenity of a well-tended garden.',
  },
  {
    src: '/static/gardening/image10.png',
    caption: 'The serenity of a well-tended garden.',
  },
];

export default function ImageGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const goToPrevious = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
          onClick={() => openLightbox(index)}
        >
          <Image
            src={image.src}
            alt={`Image of ${image.caption}`}
            layout="responsive"
            width={300}
            height={200}
            className="transform group-hover:scale-105 transition-transform duration-300"
            placeholder="blur"
            blurDataURL={image.src}
            onLoadingComplete={() => setLoading(false)}
          />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white">Loading...</span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-70 text-white text-sm font-semibold">
            {image.caption}
          </div>
        </div>
      ))}
      {isOpen && (
        <Lightbox
          mainSrc={images[currentImageIndex].src}
          nextSrc={images[(currentImageIndex + 1) % images.length].src}
          prevSrc={
            images[(currentImageIndex - 1 + images.length) % images.length].src
          }
          onCloseRequest={closeLightbox}
          onMovePrevRequest={goToPrevious}
          onMoveNextRequest={goToNext}
          imageCaption={images[currentImageIndex].caption}
        />
      )}
    </div>
  );
}
