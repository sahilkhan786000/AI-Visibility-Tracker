import { useEffect, useRef } from "react";

export default function NatureVideoBackground() {
  const videoRef = useRef<HTMLVideoElement | null>(null);


  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/videos/nature/nature3.mp4" type="video/mp4" />
      </video>

    
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