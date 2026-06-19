import { ASSETS } from "@/lib/constants";

type PageBackgroundProps = {
  opacity?: number;
};

export function PageBackground({ opacity = 0.2 }: PageBackgroundProps) {
  const overlayOpacity = Math.min(Math.max(1 - opacity, 0), 1);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${ASSETS.backgroundImage}')` }}
      />
      <div
        className="absolute inset-0 bg-background"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
}
