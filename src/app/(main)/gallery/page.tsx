import ImageGallery from '@/components/image-gallery';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

export default function Gallery() {
  return (
    <div>
      <div className="sticky top-0 bg-background p-4 lg:p-6 z-50">
        <Heading
          title="Gardening Image Gallery"
          description="Explore stunning gardening moments shared by our community. Whether
          it's a lush balcony or a blooming backyard, find inspiration
          here!"
          isLanding
        />
        <Separator className="mt-6" />
      </div>

      <div className=" rounded-xl shadow-sm px-2">
        <ImageGallery />
      </div>
    </div>
  );
}
