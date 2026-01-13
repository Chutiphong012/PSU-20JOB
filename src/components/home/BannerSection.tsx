// src/components/home/BannerSection.tsx
'use client';

export default function HeroSection() {
  return (
    <div className="w-full">
      
      <img 
        src="https://placehold.co/1920x650/111827/ffffff?text=Banner+Image" 
        alt="Banner" 
        className="w-full h-62.5 md:h-112.5 lg:h-137.5 object-cover"
      />
    </div>
  );
}