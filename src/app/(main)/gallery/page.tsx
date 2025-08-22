import ImageGallery from '@/components/image-gallery';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

export default function Gallery() {
  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 py-12">
      <Heading
        title="Gardening Image Gallery"
        description="Explore stunning gardening moments shared by our community. Whether
          it's a lush balcony or a blooming backyard, find inspiration
          here!"
      />
      <Separator className="my-6" />

      <div className=" rounded-xl shadow-sm p-6">
        <ImageGallery />
      </div>
    </div>
  );
}
