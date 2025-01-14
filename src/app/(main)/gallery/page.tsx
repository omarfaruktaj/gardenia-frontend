import ImageGallery from '@/components/image-gallery';
import { Separator } from '@/components/ui/separator';

export default function Gallery() {
  return (
    <div className="p-4">
      <div className="space-y-4 ">
        <h2 className="text-xl font-semibold mb-4">Gardening Image Gallery</h2>
        <Separator />
      </div>
      <main className="container mx-auto min-h-screen">
        {/* <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center my-6">
          Gardening Image Gallery
        </h1>
        
        <p className="text-sm sm:text-base md:text-lg text-center mb-8 text-muted-foreground">
          Explore beautiful gardening images shared by our community!
        </p> */}
        <ImageGallery />
      </main>
    </div>
  );
}
