"use client";

import Image from "next/image";
import { useState } from "react";

export default function MateIcon({ width = 32, height = 32, className = "" }) {
  const [imageError, setImageError] = useState(false);

  // Always show fallback for now to avoid loading issues
  // You can change this to false once the image is confirmed working
  if (imageError || false) {
    // Fallback: Show a text-based icon
    return (
      <div 
        className={`${className} flex items-center justify-center bg-pink-100 rounded-full text-pink-600 font-bold`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        🧉
      </div>
    );
  }

  return (
    <Image
      src="/mate_icon.png"
      alt="Mate Icon"
      width={width}
      height={height}
      className={className}
      priority
      unoptimized={true}
      onError={() => setImageError(true)}
    />
  );
}
