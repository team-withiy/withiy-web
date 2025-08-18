/* eslint-disable @next/next/no-img-element */
const BlurImage = ({ src, alt, className, ...props }: { src: string; alt: string; className?: string }) => (
  <img src={src} alt={alt} className={className} data-testid="blur-image" {...props} />
);

export default BlurImage;
