import ImageGallery from '@/components/image-gallery';
import { Separator } from '@/components/ui/separator';

export default function Gallery() {
  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-800">
          Gardening Image Gallery
        </h1>
        <p className="mt-4 text-green-600 text-sm sm:text-base max-w-2xl mx-auto">
          Explore stunning gardening moments shared by our community. Whether
          it&apos;s a lush balcony or a blooming backyard, find inspiration
          here!
        </p>
        <div className="mt-6 flex justify-center">
          <Separator className="w-1/3 bg-green-300" />
        </div>
      </div>

      <div className=" rounded-xl shadow-sm p-6">
        <ImageGallery />
      </div>
    </div>
  );
}
