import { useEffect, useState } from "react";

const SPACE_VIDEOS = [
  "/videos/space/space.mp4",
  "/videos/space/space2.mp4",
  "/videos/space/space3.mp4",
  "/videos/space/space4.mp4",
];

export default function SpaceVideoBackground() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % SPACE_VIDEOS.length);
    }, 5000); // ⏱ 5 seconds per video

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Background video */}
      <video
        key={SPACE_VIDEOS[index]} // 👈 forces reload on change
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover transition-opacity duration-1000"
      >
        <source src={SPACE_VIDEOS[index]} type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />
    </div>
  );
}
