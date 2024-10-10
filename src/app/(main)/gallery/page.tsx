import ImageGallery from '@/components/image-gallery';

export default function Gallery() {
  return (
    <div>
      <main className="container mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center my-6">
          Gardening Image Gallery
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-center mb-8 text-muted-foreground">
          Explore beautiful gardening images shared by our community!
        </p>
        <ImageGallery />
      </main>
    </div>
  );
}
