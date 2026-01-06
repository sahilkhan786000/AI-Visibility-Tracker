import { useEffect, useRef, useState } from "react";

const NATURE_VIDEOS = [
  "/videos/nature/nature1.mp4",
  "/videos/nature/nature2.mp4",
  "/videos/nature/nature3.mp4",
  "/videos/nature/nature4.mp4",
];

export default function NatureVideoBackground() {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Rotate video every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % NATURE_VIDEOS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Slow down playback to 0.5x
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, [index]); // re-apply when video changes

   return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        key={NATURE_VIDEOS[index]}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src={NATURE_VIDEOS[index]} type="video/mp4" />
      </video>

      {/* 🌿 Subtle vignette instead of white wash */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-b
          from-black/10
          via-transparent
          to-black/20
        "
      />
    </div>
  );
}
