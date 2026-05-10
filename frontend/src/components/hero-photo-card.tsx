import { cn } from "@/lib/utils";

interface HeroPhotoCardProps {
  imageUrl?: string;
  fallbackColor?: string;
  children?: React.ReactNode;
  className?: string;
}

export function HeroPhotoCard({
  imageUrl,
  fallbackColor = "bg-pale-blue",
  children,
  className
}: HeroPhotoCardProps) {
  return (
    <div className={cn("relative rounded-lg overflow-hidden w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3]", fallbackColor, className)}>
      {imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img 
          src={imageUrl} 
          alt="Hero visual" 
          className="w-full h-full object-cover mix-blend-multiply opacity-80"
        />
      )}
      
      {/* Decorative gradient overlay matching design.md instructions (media-led gradient) */}
      {!imageUrl && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent mix-blend-overlay" />
      )}
      
      {/* Abstract geometric shapes if no image */}
      {!imageUrl && (
        <div className="absolute inset-0 flex items-center justify-center opacity-50">
          <div className="w-64 h-64 rounded-full blur-3xl bg-action-blue/20 absolute top-1/4 left-1/4" />
          <div className="w-48 h-48 rounded-full blur-2xl bg-coral/20 absolute bottom-1/4 right-1/4" />
        </div>
      )}
      
      {children && (
        <div className="absolute inset-0 flex flex-col p-8">
          {children}
        </div>
      )}
    </div>
  );
}
