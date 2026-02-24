
export default function SpaceVideoBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
   
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover transition-opacity duration-1000"
      >
        <source src="/videos/space/space4.mp4" type="video/mp4" />
      </video>

    
      <div className="absolute inset-0 bg-black/60" />
    </div>
  );
}