import { cn } from '@/lib/utils';

interface HeadingProps {
  title: string;
  description?: string;
  isLanding?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  isLanding = false,
}) => {
  return (
    <div>
      <h2
        className={cn(
          ' font-bold tracking-tight',
          isLanding ? 'text-xl' : 'text-3xl'
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
